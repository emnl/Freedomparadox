var battery : int;
var maxbattery : int;
private var flashlightOn: boolean;
var flashlight: Light;
function Start(){
	flashlightOn=false;
	flashlight = GetComponent("Light");
}
function Update () {

//Flashlight
if (battery > 0){
if (Input.GetKeyDown("f")) {
	
	if (flashlightOn){
		flashlightOn=false;
		flashlight.enabled = false;
		audio.Play();
		}
    else{
		flashlightOn=true;
		flashlight.enabled = true;
		audio.Play();
	}
   
	}
}
if (flashlightOn){
	battery--;
	
}
else if (battery<maxbattery && !flashlightOn){
	battery++;
	battery++;
	
}
if(battery<1){
		FlashlightDie();
	}

}

function FlashlightDie(){
	flashlightOn=false;
	flashlight.enabled = false;
	audio.Play();
	yield WaitForSeconds(0.11);
	flashlight.enabled = true;
	audio.Play();
	yield WaitForSeconds(0.15);
	flashlight.enabled = false;
	audio.Play();
	yield WaitForSeconds(0.23);
	flashlight.enabled = true;
	audio.Play();
	yield WaitForSeconds(0.51);
	flashlight.enabled = false;
	audio.Play();
	yield WaitForSeconds(0.32);
	flashlight.enabled = true;
	audio.Play();
	yield WaitForSeconds(0.48);
	flashlight.enabled = false;
	audio.Play();
}