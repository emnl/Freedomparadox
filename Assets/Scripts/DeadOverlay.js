var guiStyle1 : GUIStyle;
var guiStyle2 : GUIStyle;
var guiStyle3 : GUIStyle;
var damageTexture : Texture2D;
var dead : boolean = false;

function OnGUI ()
{
	guiStyle1.normal.background = damageTexture;
	
	
    
GUI.Box (Rect (0, 0, Screen.width, Screen.height), "",guiStyle1);


	if (dead){
		
		Screen.lockCursor = false;
		
		GUI.Box(Rect (Screen.width/4, Screen.height/3+40, Screen.width/4*2, Screen.height/3), "You have died" ,guiStyle2);
		
			if(GUI.Button(Rect(Screen.width/4+10, 	Screen.height/3+Screen.height/6+20, 	Screen.width/8*2-20, 	Screen.height/6-40), "Main Menu" ,guiStyle3)){
			audio.Play();
				Application.LoadLevel(0);
				}
			if(GUI.Button(Rect(Screen.width/4+Screen.width/8*2+10, 	Screen.height/3+Screen.height/6+20, 	Screen.width/8*2-20, 	Screen.height/6-40), "Restart Game" ,guiStyle3)){
			audio.Play();
				Application.LoadLevel(1);
				}
			}
}


function Start(){
	yield WaitForSeconds(8.0);
	dead = true;
}