var projectile : Rigidbody;
var speed = 20;
var player : Collider;
var reloadTime = 0.5;
var ammoCount = 20;
public var lastShot = -10.0;

function Fire(){

//if( Input.GetButtonDown( "Fire1" ) ){


//}

if (Time.time > reloadTime + lastShot && ammoCount > 0){

GetComponent(AudioSource).Play();
var instantiatedProjectile : Rigidbody = Instantiate(projectile, transform.position, transform.rotation );
instantiatedProjectile.velocity = transform.TransformDirection( Vector3( 0, 0, speed ) );
Physics.IgnoreCollision( instantiatedProjectile. collider,transform.root.collider );



Physics.IgnoreCollision(instantiatedProjectile.collider,player);

lastShot = Time.time;
}
}