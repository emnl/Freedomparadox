var range = 100.0;
var fireRate = 0.05;
var force = 10.0;
var damage = 10.0;
var bulletsPerClip = 12;
var clips = 2;
var reloadTime = 1.0;
var hitParticles : ParticleEmitter;
var pickedUp : boolean = true;
var muzzleFlash : Renderer;
var recoilOffset: float = 0.1;



var reloading: boolean = false;
var bulletsLeft : int = 0;
private var nextFireTime = 0.0;
private var m_LastFrameShot = -1;
var gunSounds : AudioClip[];



function Start () {
	hitParticles = GetComponentInChildren(ParticleEmitter);
	
	// We don't want to emit particles all the time, only when we hit something.
	if (hitParticles){
		hitParticles.emit = false;

	}
	bulletsLeft = bulletsPerClip;
}

function LateUpdate() {
	if (muzzleFlash) {
		// We shot this frame, enable the muzzle flash
		if (m_LastFrameShot == Time.frameCount) {
			muzzleFlash.transform.localRotation = Quaternion.AngleAxis(Random.value * 360, Vector3.forward);
			muzzleFlash.enabled = true;

			if (audio) {
				//if (!audio.isPlaying)
					audio.Play();
				audio.loop = true;
			}
		} else {
		// We didn't, disable the muzzle flash
			muzzleFlash.enabled = false;
		//	enabled = false;
			
			// Play sound
			if (audio)
			{
				audio.loop = false;
			}
		}
	}
	}
	function FixedUpdate(){
		
	if (recoilOffset>0.0){
		recoilOffset-=0.1;
		}
		if(recoilOffset>1){
		recoilOffset=1;
		
	}
	if(recoilOffset<=0.0){
		recoilOffset=0.0;
	}
}

function Fire () {
	
	

	
	// If there is more than one bullet between the last and this frame
	// Reset the nextFireTime
	while (Time.time - fireRate > nextFireTime)
		nextFireTime = Time.time - Time.deltaTime;
	
	// Keep firing until we used up the fire time
	if(Input.GetButtonDown ("Fire1") && nextFireTime < Time.time && bulletsLeft != 0 && reloading==false) {
		audio.clip = gunSounds[0];
		FireOneShot();
		transform.Find("Hand_final2").animation.Play("fire");
		nextFireTime += fireRate;
	}
	else if (Input.GetButtonDown("Fire1") && nextFireTime < Time.time && bulletsLeft ==0 && reloading==false){
		
		audio.clip = gunSounds[1];
			audio.Play();
			nextFireTime+=fireRate;
		
	}

}

function FireOneShot () {
	var direction = transform.TransformDirection(Vector3.forward);
	
	direction.x += ((Random.value - 0.5) * recoilOffset); 
	direction.y += ((Random.value - 0.5) * recoilOffset); 
	recoilOffset+=1;
	var hit : RaycastHit;
	
	// Did we hit anything?
	//transform.parent.parent.rigidbody.AddTorque(Random.insideUnitSphere * recoil);
	
	
	if (Physics.Raycast (muzzleFlash.transform.position, direction, hit, range)) {
		// Apply a force to the rigidbody we hit
		if (hit.rigidbody)
			hit.rigidbody.AddForceAtPosition(force * direction, hit.point);
		
		
		// Place the particle system for spawing out of place where we hit the surface!
		// And spawn a couple of particles
		if (hitParticles) {
			hitParticles.transform.position = hit.point;
			hitParticles.transform.rotation = Quaternion.FromToRotation(Vector3.up, hit.normal);
			hitParticles.Emit();
			//.transform.DetachChildren();
		}

		// Send a damage message to the hit object			
		hit.collider.SendMessageUpwards("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
	}
	//yield WaitForSeconds(0.1);
	
		
	
	bulletsLeft--;

	// Register that we shot this frame,
	// so that the LateUpdate function enabled the muzzleflash renderer for one frame
	m_LastFrameShot = Time.frameCount;
	enabled = true;
	
	// Reload gun in reload Time		
	//if (bulletsLeft == 0)
		//Reload();			
}

function TryReload(){
	if(clips>0 && reloading==false)
		Reload();
}
function StopReloading(){
	reloading=false;
}


function Reload () {

	// Wait for reload time first - then add more bullets!
	reloading=true;
	transform.Find("Hand_final2").animation.Play("reload");
	transform.parent.audio.Play();
	yield WaitForSeconds(reloadTime);
	transform.parent.audio.Stop();
	// We have a clip left reload
	//if (clips > 0) {
		clips--;
		bulletsLeft = bulletsPerClip;
		reloading = false;
	//}
}



function GetBulletsLeft () {
	return bulletsLeft;
}