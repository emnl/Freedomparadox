var walkSpeed = 15.0;
var runSpeed = 15.0;

// If checked, the run key toggles between running and walking. Otherwise player runs if the key is held down and walks otherwise
// There must be a button set up in the Input Manager called "Run"
var toggleRun = false;

var jumpSpeed = 8.0;
var gravity = 20.0;

// Units that player can fall before a falling damage function is run. To disable, type "infinity" in the inspector
var fallingDamageThreshold = 6.0;

// If the player ends up on a slope which is at least the Slope Limit as set on the character controller, then he will slide down
var slideWhenOverSlopeLimit = false;

// If checked and the player is on an object tagged "Slide", he will slide down it regardless of the slope limit
var slideOnTaggedObjects = false;

var slideSpeed = 12.0;

// If checked, then the player can change direction while in the air
var airControl = false;

// Small amounts of this results in bumping when walking down slopes, but large amounts results in falling too fast
var antiBumpFactor = .75;

// Player must be grounded for at least this many physics frames before being able to jump again; set to 0 to allow bunny hopping 
var antiBunnyHopFactor = 1;

private var moveDirection = Vector3.zero;
private var grounded = false;
private var controller : CharacterController;
private var myTransform : Transform;
private var speed : float;
private var hit : RaycastHit;
private var fallStartLevel : float;
private var falling = false;
private var slideLimit : float;
private var rayDistance : float;
private var contactPoint : Vector3;
private var playerControl = false;
private var jumpTimer : int;



//var jumpSpeed = 8.0;
//var gravity = 20.0;


private var crouch = false;
//private var running = true;
var headbobber;
var walkSounds : AudioClip[];
var audioStepLength = 0.3;
//private var moveDirection = Vector3.zero;
//private var grounded : boolean = false;

var capsule : Collider;
var self : Collider;

function Start () {
    controller = GetComponent(CharacterController);
    myTransform = transform;
    speed = runSpeed;
    rayDistance = controller.height * .5 + controller.radius;
    slideLimit = controller.slopeLimit - .1;
    jumpTimer = antiBunnyHopFactor;
}
function Awake(){
		Physics.IgnoreCollision(capsule, self);		
		PlayStepSounds();
}

function FixedUpdate() {
if (grounded) {
        var sliding = false;
        // See if surface immediately below should be slid down. We use this normally rather than a ControllerColliderHit point,
        // because that interferes with step climbing amongst other annoyances
        if (Physics.Raycast(myTransform.position, -Vector3.up, hit, rayDistance)) {
            if (Vector3.Angle(hit.normal, Vector3.up) > slideLimit)
                sliding = true;
        }
        // However, just raycasting straight down from the center can fail when on steep slopes
        // So if the above raycast didn't catch anything, raycast down from the stored ControllerColliderHit point instead
        else {
            Physics.Raycast(contactPoint + Vector3.up, -Vector3.up, hit);
            if (Vector3.Angle(hit.normal, Vector3.up) > slideLimit)
                sliding = true;
        }

        // If we were falling, and we fell a vertical distance greater than the threshold, run a falling damage routine
        if (falling) {
            falling = false;
            if (myTransform.position.y < fallStartLevel - fallingDamageThreshold)
                FallingDamageAlert (fallStartLevel - myTransform.position.y);
        }
        
        // If running isn't on a toggle, then use the appropriate speed depending on whether the run button is down
        if (!toggleRun) 
            speed = Input.GetButton("Run")? walkSpeed : runSpeed;

        // If sliding (and it's allowed), or if we're on an object tagged "Slide", get a vector pointing down the slope we're on
        if ( (sliding && slideWhenOverSlopeLimit) || (slideOnTaggedObjects && hit.collider.tag == "Slide") ) {
            var hitNormal = hit.normal;
            moveDirection = Vector3(hitNormal.x, -hitNormal.y, hitNormal.z);
            Vector3.OrthoNormalize (hitNormal, moveDirection);
            moveDirection *= slideSpeed;
            playerControl = false;
        }
        // Otherwise recalculate moveDirection directly from axes, adding a bit of -y to avoid bumping down inclines
        else {
            moveDirection = Vector3(Input.GetAxis("Horizontal"), -antiBumpFactor, Input.GetAxis("Vertical"));
            moveDirection = myTransform.TransformDirection(moveDirection) * speed;
            playerControl = true;
        }

        // Jump! But only if the jump button has been released and player has been grounded for a given number of frames
        if (!Input.GetButton("Jump"))
            jumpTimer++;
        else if (jumpTimer >= antiBunnyHopFactor) {
            moveDirection.y = jumpSpeed;
            jumpTimer = 0;
        }
    }
    else {
        // If we stepped over a cliff or something, set the height at which we started falling
        if (!falling) {
            falling = true;
            fallStartLevel = myTransform.position.y;
        }
        
        // If air control is allowed, check movement but don't touch the y component
        if (airControl && playerControl) {
            moveDirection.x = Input.GetAxis("Horizontal") * speed;
            moveDirection.z = Input.GetAxis("Vertical") * speed;
            moveDirection = myTransform.TransformDirection(moveDirection);
        }
    }

    // Apply gravity
    moveDirection.y -= gravity * Time.deltaTime;

    // Move the controller, and set grounded true or false depending on whether we're standing on something
    grounded = (controller.Move(moveDirection * Time.deltaTime) & CollisionFlags.CollidedBelow) != 0;
}

/*function FixedUpdate() {


	
	if (grounded) {
	


	
		// We are grounded, so recalculate movedirection directly from axes
		moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		if (Input.GetButton ("Jump")) {
			moveDirection.y = jumpSpeed;
			GetComponent(AudioSource).Play();
		}
	}

	// Apply gravity
	moveDirection.y -= gravity * Time.deltaTime;
	
	// Move the controller
	var controller : CharacterController = GetComponent(CharacterController);
	var flags = controller.Move(moveDirection * Time.deltaTime);
	grounded = (flags & CollisionFlags.CollidedBelow) != 0;
	

	
	


	
}*/
function Update () {
    // If the run button is set to toggle, then switch between walk/run speed. (We use Update for this...
    // FixedUpdate is a poor place to use GetButtonDown, since it doesn't necessarily run every frame and can miss the event)
    if (toggleRun && grounded && Input.GetButtonDown("Run"))
        speed = (speed == walkSpeed? runSpeed : walkSpeed);
}
// Store point that we're in contact with for use in FixedUpdate if needed
function OnControllerColliderHit (hit : ControllerColliderHit) {
    contactPoint = hit.point;
}

// If falling damage occured, this is the place to do something about it. You can make the player
// have hitpoints and remove some of them based on the distance fallen, add sound effects, etc.
function FallingDamageAlert (fallDistance : float) {

	SendMessageUpwards("ApplyDamage", fallDistance, SendMessageOptions.DontRequireReceiver);
    Debug.Log ("Ouch! Fell " + fallDistance + " units!");   
}


function PlayStepSounds () {
	var controller : CharacterController = GetComponent(CharacterController);

	while (true) {
		if (controller.isGrounded && controller.velocity.magnitude > 0.5) {
			audio.clip = walkSounds[Random.Range(0, walkSounds.length)];
			audio.Play();
			yield WaitForSeconds(audioStepLength);
		} else {
			yield;
		}
	}
}

@script RequireComponent(CharacterController)