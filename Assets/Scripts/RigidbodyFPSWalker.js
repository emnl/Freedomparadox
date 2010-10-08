var speed = 15.0;
var gravity = 10.0;
var maxVelocityChange = 10.0;
var canJump = true;
var jumpHeight = 2.0;
private var grounded = false;
private var crouch = false;
private var running = true;



//@script RequireComponent(Rigidbody, CapsuleCollider)


function Awake ()
{
    rigidbody.freezeRotation = true;
    rigidbody.useGravity = false;
	headbobber=GetComponentInChildren(HeadBobber);
}

function FixedUpdate ()
{

		if(Input.GetButtonDown("Crouch") && crouch == false){
			
			GetComponent(CapsuleCollider).height = 0.25;
			GetComponent(CharacterController).height = 0.5;
						
			GetComponent(FPSWalker).speed = 6;
			GetComponentInChildren(HeadBobber).bobbingAmount = -0.1;
			GetComponentInChildren(HeadBobber).bobbingAmount2 = 0.1;		
			
			running = false;
			crouch = true;
			print("Crouch");
		}


		if(Input.GetButtonUp("Crouch") && crouch == true){
						
			GetComponent(CharacterController).height = 2;
			GetComponent(CapsuleCollider).height = 1;
			GetComponent(Transform).position += Vector3.up*1;
			
			GetComponent(FPSWalker).speed = 15;
			GetComponentInChildren(HeadBobber).bobbingAmount = -0.2;
			GetComponentInChildren(HeadBobber).bobbingAmount2 = 0.2;			
			
			running = true;
			crouch = false;

		
		}
		//Walking
		if(Input.GetButtonDown("Walk") && running == true){
			
			GetComponent(FPSWalker).speed = 6;
			running = false;
			print("Walk");
		}
		
		if(Input.GetButtonUp("Walk") && running == false){
			
			
			GetComponent(FPSWalker).speed = 15;
			running = true;

		}

		
    if (true)//grounded)
    {
        // Calculate how fast we should be moving
        var targetVelocity = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
        targetVelocity = transform.TransformDirection(targetVelocity);
        targetVelocity *= speed;
       
        // Apply a force that attempts to reach our target velocity
        var velocity = rigidbody.velocity;
        var velocityChange = (targetVelocity - velocity);
        velocityChange.x = Mathf.Clamp(velocityChange.x, -maxVelocityChange, maxVelocityChange);
        velocityChange.z = Mathf.Clamp(velocityChange.z, -maxVelocityChange, maxVelocityChange);
        velocityChange.y = 0;
        rigidbody.AddForce(velocityChange, ForceMode.VelocityChange);
   
        // Jump
        if (canJump && Input.GetButton("Jump"))
        {
            rigidbody.velocity = Vector3(velocity.x, CalculateJumpVerticalSpeed(), velocity.z);
        }
		
		
		
    }
   
    // We apply gravity manually for more tuning control
    rigidbody.AddForce(Vector3 (0, -gravity * rigidbody.mass, 0));
   


var controller : CharacterController = GetComponent(CharacterController);

if (controller.collisionFlags == CollisionFlags.Below){
	grounded=true;
	}
	else{
		grounded=false;
	}
	

}




function CalculateJumpVerticalSpeed ()
{
    // From the jump height and gravity we deduce the upwards speed
    // for the character to reach at the apex.
    return Mathf.Sqrt(2 * jumpHeight * gravity);
}
 