


private var timeleft : float;

function Start()
{
	timeleft = 1;
}

function Update()
{

	timeleft -= Time.deltaTime;
    
    if( timeleft <= 0.0 )
    {
        timeleft = 1;
		secs = Mathf.Round(Time.timeSinceLevelLoad);
		
		minVar = Mathf.Floor(secs/60);
		secVar = secs % 60;
		
		minVar = 60 - minVar;
		secVar = 60 - secVar;
		
			secVar -= 1;
			minVar -= 1;
			
			var secDesp : String;
			
			if(secVar < 10)
			{
				secDesp = "0" + secVar.ToString();
			}
			else
				secDesp = secVar.ToString();
			
		guiText.text = minVar.ToString() + ":" + secDesp;
	}
}