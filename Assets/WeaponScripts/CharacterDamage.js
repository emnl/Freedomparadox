var hitPoints = 100.0;
var deadReplacement : Transform;
var dieSound : AudioClip;
var guiStyle :  GUIStyle;
var damageTexture : Texture2D;

private var op = (100-hitPoints) / 100;
private var regen = true;


function Update(){
	op = (100-hitPoints) / 100;
	
	if (regen){
	regen=false;
	AddHP();	
	
	}
	if (transform.position.y<25)
	hitPoints--;
	
	if (hitPoints <= 0.0)
	{
		Detonate();
	}
	
}
function ApplyDamage (damage : float) {
	// We already have less than 0 hitpoints, maybe we got killed already?
	if (hitPoints <= 0.0)
		return;

	hitPoints -= damage;
	
	
	if (hitPoints <= 0.0)
	{
		Detonate();
	}

	
}

function OnGUI ()
{
	guiStyle.normal.background = damageTexture;
	//GUI.color = Color (1, 0, 0, op);
    GUI.color.a = op;
	//GUI.Window (0, Rect (0, 0, Screen.width, Screen.height), DoMyWindow, "",guiStyle);
	GUI.Box (Rect (0, 0, Screen.width, Screen.height), "",guiStyle);

}



function AddHP(){

	if(hitPoints<100){
	
		hitPoints +=5;
		if (hitPoints>100){
			hitPoints=100;
		}
		yield WaitForSeconds(1.0);
		
	}
	regen=true;
}

function Detonate () {
	// Destroy ourselves

	Destroy(gameObject);
	
	// Play a dying audio clip
	if (dieSound)
		AudioSource.PlayClipAtPoint(dieSound, transform.position);
		
	Destroy(GameObject.Find("Music"));

	// Replace ourselves with the dead body
	if (deadReplacement) {
		var dead : Transform = Instantiate(deadReplacement, transform.position, transform.rotation);
		
		// Copy position & rotation from the old hierarchy into the dead replacement
		CopyTransformsRecurse(transform, dead);
	}

	

}

static function CopyTransformsRecurse (src : Transform,  dst : Transform) {
	dst.position = src.position;
	dst.rotation = src.rotation;
	
	for (var child : Transform in dst) {
		// Match the transform with the same name
		var curSrc = src.Find(child.name);
		if (curSrc)
			CopyTransformsRecurse(curSrc, child);
	}
}


	
