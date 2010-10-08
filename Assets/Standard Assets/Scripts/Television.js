function Update () {
	if (Input.GetButtonDown ("Jump")) {
		if (renderer.material.mainTexture.isPlaying) {
			renderer.material.mainTexture.Pause();
			audio.Play();
		}
		else {
			renderer.material.mainTexture.Play();
		}
	}
}