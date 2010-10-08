var explosion : GameObject;


function OnCollisionEnter( collision : Collision )
{
var contact : ContactPoint = collision.contacts[0];
var rotation = Quaternion.FromToRotation( Vector3.up, contact.normal );
var instantiatedExplosion : GameObject = Instantiate(
explosion, contact.point, rotation );
Destroy( gameObject );
}