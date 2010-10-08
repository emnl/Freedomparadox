
//function Update () {
//}
private var player:Collider;
private var PistolObject: GameObject;


function Start(){
	PistolObject = GameObject.FindWithTag("Pistol");
	
	

}



function OnCollisionEnter(hit: Collision) {
    if (hit.gameObject.tag == ("Player")) {
	PistolObject.GetComponent("Pistol").clips +=1;
	transform.parent.audio.Play();
	Destroy(gameObject);
	}
}