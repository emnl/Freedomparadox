
//This script enables underwater effects. Attach to main camera.

//Define variables
var underwaterLevel = 7;

//The scene's default fog settings
private var defaultFog = RenderSettings.fog;
private var defaultFogColor = RenderSettings.fogColor;
private var defaultFogDensity = RenderSettings.fogDensity;
private var defaultSkybox = RenderSettings.skybox;
var noSkybox : Material;

function Start () {
    //Set the background color
    camera.backgroundColor = Color (0, 0.4, 0.7, 1);
}

function Update () {
    if (transform.position.y < underwaterLevel) {
        RenderSettings.fog = true;
        RenderSettings.fogColor = Color (0, 0.0, 0.1, 0.2);
        RenderSettings.fogDensity = 0.04;
        
    }
    
    else {
        RenderSettings.fog = defaultFog;
        RenderSettings.fogColor = defaultFogColor;
        RenderSettings.fogDensity = defaultFogDensity;
        RenderSettings.skybox = defaultSkybox;
    }
}