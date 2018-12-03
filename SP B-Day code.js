<style>
.flex-container {
  display: flex;
  flex-direction: column;
 /* background-color: DodgerBlue;*/
    background: linear-gradient(141deg, #56abda 0%, #8dc486 51%, #eae360 75%);
}

.flex-container > div {
  /* background-color: #f1f1f1;*/
  /*width: 25%;*/
 /* margin: 10px;*/
  text-align: center;
 /* line-height: 25px;*/
  font-size: 13px;
}

.Bimg{
	/*width:100px;
	height:100px;*/
width:75px;
border-radius: 50%;
}

.Bcontainer {
  //margin: 80px auto;
  width: 250px;
}

h3 {
  position: relative;
  padding: 5px 10px;
  color: #fff;
  text-align: center;
  background: #708090;
font-size:1.9em;
}

h3:before {
  content: '';
  position: absolute;
  height: 0;
  width: 0;
  bottom: 100%;
  left: 0;
  border-bottom: 10px solid #696969;
  border-left: 25px solid transparent;
}

.dot {
    height: 5px;
    width: 5px;
    background-color: #006c3b;
    border-radius: 50%;
    display: inline-block;
margin-right:4px;
margin-bottom:20px;
margin-top:10px;
}

.tHead{
margin-top:10px;
color:#fff !important;
}
.tHead2{
color:#fff !important;
}

</style>
<div class="Bcontainer">
<h3>Happy Birthday</h3>
   <div id="bdayLists" class="flex-container"></div> 
</div>
<script type="text/javascript">
var arrBday = [];

function success() {
	var nameArr = [];
	var surnameArr = [];
	var dobArr = [];
	var picArr= [];
	var bdayArr = [];
	var userArr = [];
		var picArr= [];
	var ListEnumerator = this.allItems.getEnumerator();
	
	while(ListEnumerator.moveNext())
	{
		var currentItem = ListEnumerator.get_current();
		
		
		userArr.push(currentItem.get_item('user'));

		var myDOB = currentItem.get_item('DOB');
		var DOBday = myDOB.getDate();
		var DOBmonth = myDOB.getMonth() + 1;
		var DOByear = myDOB.getFullYear();
		var newDOBDate = DOBmonth + "/" + DOBday + "/" + DOByear;
		dobArr.push(newDOBDate);
		//picArr.push(currentItem.get_item('username'));
		picArr.push(currentItem.get_item('username'));
	
	}
	
	for (var i = 0; i< userArr.length ; i++){
		var temp = [];
		temp.push(userArr[i], dobArr[i],picArr[i]);
		bdayArr.push(temp);
	}

	var bdayList = bdayArr;

	var b =[];
	for(var i = 0; i < bdayList.length; i++){
		b = new Date(bdayList[i][1]);
		b.setYear(2000);
		var dd3 = b.getDate();
		var mm3 = b.getMonth();
		var yyyy3 = b.getFullYear();
		bdayList[i][1]=b;
	}


	var s1='<h2 class="tHead">Today:</h2> </br>';
	var s2='<h2 class="tHead2">Within next 14 days:</h2> </br>';
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 
	if(mm<10) {
		mm = '0'+mm
	} 
	today = new Date(yyyy,mm,dd);


	/* sorting here */
	function mySortFunction() {
		bdayList.sort(function(a, b){return new Date (a[1]) - new Date(b[1])});
		displayPeopleLoop();
	}

	function displayPeopleLoop(){
		for(i = 0; i < bdayList.length; i++){
		}
	}
	mySortFunction();
	/* sorting here */

	var len = bdayList.length; 
	var currBDay = [];
	if (len>0){
		for (var i=0; i<len; i++){
		currBDay = bdayList[i];
		var userBday = new Date(currBDay[1]);
		var checkDate = new Date();
		var dd2 = userBday.getDate();
		var mm2 = userBday.getMonth();
		if(dd2<10) {
			dd2 = '0'+dd2;
		} 

		if(mm2<10) {
			mm2 = '0'+mm2;
		} 

		checkDate = new Date(yyyy,mm2,dd2);
		var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		//console.log('check :' + checkDate.toDateString());


var picUrl ='http://sp-mysite:5555/User%20Photos/Profile%20Pictures/';
var picUrlEnd = '_MThumb.jpg';
		//console.log('user name'+currBDay[2].get_lookupValue());

		var testdate = new Date(yyyy,mm,parseInt(dd)+5);
		if(today.toDateString() === checkDate.toDateString()){
			s1 +=  '<img onerror="this.src=\'http://intranet/SiteAssets/UserPictures/green-user.png\'" class="Bimg" src="' + picUrl  + currBDay[2].get_lookupValue() + picUrlEnd +'"></img>' + '</br>' + currBDay[0].get_lookupValue() + '</br>'  + userBday.getDate() + ' ' + months[userBday.getMonth()] + '</br> ' +  '<span class="dot"></span>'+ '<span class="dot"></span>'+ '<span class="dot"></span>'+ '</br>' ;


		}
		else if(checkDate >= today && checkDate <= testdate){
			s2 +=  '<img onerror="this.src=\'http://intranet/SiteAssets/UserPictures/green-user.png\'" class="Bimg" src="' + picUrl  + currBDay[2].get_lookupValue() + picUrlEnd +'"></img>' + '</br>' + currBDay[0].get_lookupValue() + '</br>'  + userBday.getDate() + ' ' + months[userBday.getMonth()] + '</br> ' +  '<span class="dot"></span>'+ '<span class="dot"></span>'+ '<span class="dot"></span>'+ '</br>' ; 
		}
		}
		var x = '<div>' + s1 + '</div><div>' + s2 + '</div>';
		document.getElementById("bdayLists").innerHTML = x;
	}
	else{
		s1 += 'No Birthdays';
	}
}

function failed(sender, args) {
	alert("failed. Message:" + args.get_message());
}

function ViewItem()
{
	var context = new SP.ClientContext.get_current();
	
	var web = context.get_web();
	var list = web.get_lists().getByTitle('UserList');

	var query = SP.CamlQuery.createAllItemsQuery();
	allItems = list.getItems(query);
	context.load(allItems, 'Include(user,DOB,username)');

	context.executeQueryAsync(Function.createDelegate(this, this.success), Function.createDelegate(this, this.failed));
}


SP.SOD.executeOrDelayUntilScriptLoaded(ViewItem, 'SP.js');

</script>
