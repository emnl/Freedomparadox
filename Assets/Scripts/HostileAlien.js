var player : Transform;
var target : Transform;
var damping = 6.0;
var smooth = true;
var runSpeed = 0;
var hit : RaycastHit;
var distanceToPlayer : float;
var visionAngle = 160.0;
var visionRange = 300.0;
var hearRadius = 150.0;
var cubeSpawn: Transform;
var hp;
var damage = 50.0;
var canAttack : boolean = true;
private var canSeePlayer : boolean;
private var canHearPlayer : boolean;
private var canHurt: boolean = false;
var attackSounds: AudioClip[];



//@AddComponentMenu("Camera-Control/Smooth Look At")
//partial class SmoothLookAt { }

function Start(){

	player = GameObject.FindWithTag("Player").transform;
	animation["slashR"].layer = 10;
	animation["slashL"].layer = 10;
	animation["run"].layer = 1;
	animation["idle"].layer = 1;
	
	animation["run"].speed=2.5;
	animation["slashR"].speed=2.5;
	animation["slashL"].speed=2.5;
	animation["slashR"].blendMode = AnimationBlendMode.Additive;
	animation["slashL"].blendMode = AnimationBlendMode.Additive;
	
	

}



function LateUpdate () {


	

if (target != null){

directionToTarget = target.transform.position - transform.position;
}
directionToPlayer = player.transform.position - transform.position;
distanceToPlayer = Vector3.Distance(transform.position, player.transform.position);
var targetAngle = Vector3.Angle(directionToTarget, transform.forward); //for vision
var playerAngle = Vector3.Angle(directionToPlayer, transform.forward);


//Debug.Log(playerAngle);
//Debug.Log(distanceToPlayer);

if(Mathf.Abs(playerAngle) < visionAngle && distanceToPlayer < visionRange){
Physics.Linecast(transform.position, player.transform.position, hit);
 
if(hit.collider.name == player.collider.name){
canSeePlayer = true;
target = player;


}else{
canSeePlayer = false;
}
}else{
canSeePlayer = false;
}
if(distanceToPlayer < hearRadius){
canHearPlayer = true;

target = player;

}else{
canHearPlayer = false;
}



//Debug.Log(canSeePlayer);
if(canSeePlayer == false && canHearPlayer == false){    //This has to ultimately be the final else
	canSeePlayer = false;
	canHearPlayer = false;

	//FindNextWaypoint();

}


	
	if (target==player) {
		
		
		
			
			// Look at and dampen the rotation
			//var rotation = Quaternion.LookRotation(target.position - transform.position);
			//transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
			transform.LookAt(target);
			
			if(distanceToPlayer>3.5){
				transform.Translate(0,0,runSpeed*Time.deltaTime);
				//rigidbody.AddRelativeForce(0,0,runSpeed*Time.deltaTime, ForceMode.Acceleration);
			animation.CrossFade("run");
			}
			else{
				transform.Translate(0,0,0*Time.deltaTime);
				animation.CrossFade("idle");
				
		}
		
		
	}
	
	
	
		if(distanceToPlayer >=3.5 && target==player){
			runSpeed=15;
			animation["run"].speed=2.5;
			}	
		if(distanceToPlayer<3.5 && distanceToPlayer>=4 && target==player){
			runSpeed=3;
			animation["run"].speed=1;
			}
		if(distanceToPlayer <2.5 && target==player){
			runSpeed=0;
			animation.CrossFade("idle");
			}
		
		if(target!=player)
			runspeed=0;
		
		
		
		if(distanceToPlayer<4){
			Attack();
		}
		
		transform.localEulerAngles.x=0;
		
		if(distanceToPlayer>350){
			Destroy (gameObject);
			}
			
		
	}
	

	
	
	function Attack(){
	if(distanceToPlayer<4 && canAttack == true){
		
		canAttack=false;
		audio.clip = attackSounds[Random.Range(0, attackSounds.length)];
		audio.loop=false;
		audio.Play();
		
		
				
		if(Random.Range(0,2) == 1){
			animation.CrossFade("slashR");
		}
		else{
			animation.CrossFade("slashL");
		}
		canHurt=false;
		yield WaitForSeconds(0.45);
		canHurt=true;
		if (distanceToPlayer<4 && canHurt==true){
		Hurt();
		//Debug.Log("Hit");
		
		
		
		canHurt=false;

		}
		
		yield WaitForSeconds(0.7);
		
		
				
		canAttack = true;
		
		
	}
}

function Hurt(){
	

	player.collider.SendMessageUpwards("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
		
	
	
}
function Detect(){
	target=player;
}


