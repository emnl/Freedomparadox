
var gun : Transform;
var nextPos = 0.0;
var nextField = 40.0;
var nextPos2 = -0.2;
var dampVelocity = 0.4;
var dampVelocity2 = 0.4;
var dampVelocity3 = 0.4;

function Update () {
    var newPos = Mathf.SmoothDamp(gun.transform.localPosition.x, nextPos, dampVelocity, .3);
    var newField = Mathf.SmoothDamp(Camera.main.fieldOfView, nextField, dampVelocity2, .3);
    var newPos2 = Mathf.SmoothDamp(gun.transform.localPosition.y, nextPos2, dampVelocity3, .3);
    
    gun.transform.localPosition.x = newPos;
    gun.transform.localPosition.y = newPos2;
    Camera.main.fieldOfView = newField;
    
    if (Input.GetButton("Sights")) {
        //adjust viewpoint and gun position
        nextField = 40.0;
        nextPos = 0.0;
        nextPos2 = -0.2;
        
        //slow down turning and movement speed
        GetComponent(FPSWalker).speed = 1.5;
        GetComponent(MouseLook).sensitivityX = 2;
        camera.main.GetComponent(MouseLook).sensitivityX = 2;
        camera.main.GetComponent(MouseLook).sensitivityY = 2;
    } else {
        //adjust viewpoint and gun position
        nextField = 60.0;
        nextPos = 0.5;
        nextPos2 = -0.4;
        
        //speed up turning and movement speed
        GetComponent(FPSWalker).speed = 15;
        GetComponent(MouseLook).sensitivityX = 10;
        camera.main.GetComponent(MouseLook).sensitivityX = 10;
        camera.main.GetComponent(MouseLook).sensitivityY = 10;
    }
}