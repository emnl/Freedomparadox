var alienPrefab : Transform;
var hippoPrefab : Transform;
var ammo : Transform[];
var pickups : Transform;
function Update () 
{
HippoSpawn();
AlienSpawn();
AmmoSpawn();


}

function AlienSpawn(){

var spawnHz : int = 800;
var closeDistance : int = 100;
var farDistance : int = 200;

	if(Random.Range(spawnHz, 1000) == spawnHz)
	{
		var randx = Random.Range(-farDistance, farDistance);
		while(randx < closeDistance && randx > -closeDistance)
		{
		  randx = Random.Range(-farDistance, farDistance);
		}
		var randz = Random.Range(-farDistance, farDistance);
		while(randz < closeDistance && randz > -closeDistance)
		{
		  randz = Random.Range(-farDistance, farDistance);
		}
		var newPos = transform.position + transform.TransformDirection(randx,1000,randz);
		Instantiate (alienPrefab, newPos, transform.rotation);
	}
}

function HippoSpawn(){

var spawnHz : int= 250;
var closeDistance : int = 100;
var farDistance : int = 200;

	if(Random.Range(spawnHz, 1000) == spawnHz)
	{
		var randx = Random.Range(-farDistance, farDistance);
		while(randx < closeDistance && randx > -closeDistance)
		{
		  randx = Random.Range(-farDistance, farDistance);
		}
		var randz = Random.Range(-farDistance, farDistance);
		while(randz < closeDistance && randz > -closeDistance)
		{
		  randz = Random.Range(-farDistance, farDistance);
		}
		var newPos = transform.position + transform.TransformDirection(randx,1000,randz);
		Instantiate (hippoPrefab, newPos, transform.rotation);
	}
}

function AmmoSpawn(){

var spawnHz : int= 800;
var closeDistance : int = 10;
var farDistance : int = 50;

	if(Random.Range(spawnHz, 1000) == spawnHz)
	{
		var randx = Random.Range(-farDistance, farDistance);
		while(randx < closeDistance && randx > -closeDistance)
		{
		  randx = Random.Range(-farDistance, farDistance);
		}
		var randz = Random.Range(-farDistance, farDistance);
		while(randz < closeDistance && randz > -closeDistance)
		{
		  randz = Random.Range(-farDistance, farDistance);
		}
		var newPos = transform.position + transform.TransformDirection(randx,1000,randz);
		temp = Instantiate (ammo[Random.Range(0, ammo.length)], newPos, transform.rotation);
		temp.transform.parent = pickups; 
	}
}