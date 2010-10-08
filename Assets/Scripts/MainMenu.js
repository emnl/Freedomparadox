var guiStyle :  GUIStyle;
var guiStyle2 : GUIStyle;
var Background : Texture2D;
var selectionSounds : AudioClip[];
var page = 1;

function OnGUI () {
	if (page == 1){
	guiStyle.normal.background = Background;
	

	
	
	if (GUI.Button (Rect (Screen.width/6-75,Screen.height/2+100,150,25), "Start Game", guiStyle)) {
		
		audio.clip = selectionSounds[0];
		audio.Play();
		
		NextLevel();
		
	
	}
	if (GUI.Button(Rect (Screen.width/6-75,Screen.height/2+125,150,25), "Instructions", guiStyle)){
		
		audio.clip = selectionSounds[1];
		audio.Play();
		page=2;
		}
		if (GUI.Button(Rect (Screen.width/6-75,Screen.height/2+150,150,25), "Quit", guiStyle)){
		print("Exiting");
		audio.clip = selectionSounds[1];
		audio.Play();
		Application.Quit();
	}
	}
	
	if (page==2){
		GUI.Box(Rect (Screen.width/6-75, Screen.height/3+5, Screen.width/4*2, Screen.height/3), "Instructions \n \n Survive for as long as you can. \n Hunt for ammo and shelter. \n \n Controls \n Movement - WASD \n Jump - Space \n Fire - Left Mouse Button \n Weapons - 1,2 \n Reload - R \n Flashlight - F" ,guiStyle2);
			if (GUI.Button(Rect (Screen.width/6-75,Screen.height/2+150,150,25), "Back", guiStyle)){
		
			audio.clip = selectionSounds[1];
			audio.Play();
			page=1;
			}
	}
	
	}
	


function NextLevel(){
yield WaitForSeconds(1.5);
Application.LoadLevel(1);
}
	
