
function Start()
{

	var hit : RaycastHit;
	
    if (Physics.Raycast (transform.position, -Vector3.up, hit)) 
	{
        var distanceToGround = hit.distance;
    }
	
	transform.position.y -= distanceToGround-3;

}