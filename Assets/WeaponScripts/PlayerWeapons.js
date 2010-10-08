
function Start () {
	// Select the first weapon
	SelectWeapon(0);
}

function Update () {
	// Did the user press fire?
	if (Input.GetButton ("Fire1")){
		BroadcastMessage("Fire");
		}
		
	if(Input.GetButtonDown("Reload"))
		BroadcastMessage("TryReload");
		
	
	if (Input.GetKeyDown("1")) {
		SelectWeapon(0);
		BroadcastMessage("StopReloading");
	}	
	else if (Input.GetKeyDown("2")) {
		SelectWeapon(1);
		BroadcastMessage("StopReloading");
	}	
	
	else if (Input.GetKeyDown("3")) {
		SelectWeapon(2);
		BroadcastMessage("StopReloading");
	}
	else if (Input.GetKeyDown("4")) {
		SelectWeapon(3);
		BroadcastMessage("StopReloading");
	}
		else if (Input.GetKeyDown("5")) {
		SelectWeapon(4);
		BroadcastMessage("StopReloading");
	}
	else if (Input.GetKeyDown("6")) {
		SelectWeapon(5);
		BroadcastMessage("StopReloading");
	}

}

function SelectWeapon (index : int) {
	for (var i=0;i<transform.childCount;i++)	{
		// Activate the selected weapon
		if (i == index)
			transform.GetChild(i).gameObject.SetActiveRecursively(true);
		// Deactivate all other weapons
		else
			transform.GetChild(i).gameObject.SetActiveRecursively(false);
	}
}