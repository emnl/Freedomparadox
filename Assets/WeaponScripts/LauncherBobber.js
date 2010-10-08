
 private var timer = 0.0;
 private var timer2 = 0.0;
 var bobbingSpeed = 0.4;
var bobbingSpeed2 = 0.2;
var bobbingAmount = -0.05;
var bobbingAmount2 = 0.05;
var waveslice :float;
var midpoint = -0.3;
var midpoint2= 0.1;
 var test;
 
 function FixedUpdate () {
    waveslice = 0.0;
	waveslice2 = 0.0;
    horizontal = Input.GetAxis("Horizontal");
    vertical = Input.GetAxis("Vertical");
    if (Mathf.Abs(horizontal) == 0 && Mathf.Abs(vertical) == 0) {
       timer = 0.0;
	   timer2 = 0.0;
    }
    else {
       waveslice = Mathf.Sin(timer);
	   waveslice2 = Mathf.Sin(timer2);
       timer = timer + bobbingSpeed;
	   timer2 = timer2 + bobbingSpeed2;
       if (timer > Mathf.PI * 2) {
          timer = timer - (Mathf.PI * 2);
       }
	   if(timer2 > Mathf.PI *2){
			timer2 =	timer2 - (Mathf.PI * 2);
		}
    }
    if (waveslice != 0) {
       translateChange = waveslice * bobbingAmount;
       totalAxes = Mathf.Abs(horizontal) + Mathf.Abs(vertical);
       totalAxes = Mathf.Clamp (totalAxes, 0.0, 1.0);
       translateChange = totalAxes * translateChange;
       transform.localPosition.y = midpoint + translateChange;
	   
    }
    else {
       transform.localPosition.y = midpoint;
    }
	    if (waveslice2 != 0) {
       translateChange2 = waveslice2 * bobbingAmount2;
       totalAxes = Mathf.Abs(horizontal) + Mathf.Abs(vertical);
       totalAxes = Mathf.Clamp (totalAxes, 0.0, 1.0);
       translateChange2 = totalAxes * translateChange2;
       transform.localPosition.x = midpoint2 + translateChange2;
    }
    else {
       transform.localPosition.x = midpoint2;
    }
	
	

 }
/* function FixedUpdate(){
	test=waveslice;
 }*/