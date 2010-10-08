
//function Update () {
//}
private var player:Collider;
private var MachineGunObject: GameObject;


function Start(){
	MachineGunObject = GameObject.Find("MachineGun2");
	//machineGun = MachineGun.GetComponent("MachineGun");
}



function OnCollisionEnter(hit: Collision) {
    if (hit.gameObject.tag == ("Player")) {
	MachineGunObject.GetComponent(MachineGun).clips+= 1;
	transform.parent.audio.Play();
	Destroy(gameObject);
	}
}
