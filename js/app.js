var MessageSetting = new Vue({
  el: '#message-setting',
  data: {
    settings :{
    	message: 'Please don\'t forget about Namaz',
	    channel: '',
	    token: '',
	    imageURL: 'http://static.thousandwonders.net/Qol%C5%9F%C3%A4rif.Mosque.original.14573.jpg'
    }
  },
  methods: {
  	saveMessageSettings() {
  		console.log('saved');
  		localStorage.setItem('slack_settings',JSON.stringify(this.settings));
  	},
  	setDefaultSettings() {
  		this.settings=JSON.parse(localStorage.getItem('slack_settings'));
  	}
  },
  mounted() {
  	const settings = localStorage.getItem('slack_settings');
  	if(!settings) {
	  	this.saveMessageSettings();
  	}
  	this.setDefaultSettings();
  }
});




/*================ SCHEDULE SETTINGS ================*/

var SchedulesSetting = new Vue({
  el: '#schedule-setting',
  data: {
  	scheduleForm: { hour: null, minute: null, meridium:null},
    schedules: [
      { hour:'01',minute: '08', time: '01:08', meridium: 'AM', enabled: true , sent:false },
    
    ],
    imageURL: 'http://static.thousandwonders.net/Qol%C5%9F%C3%A4rif.Mosque.original.14573.jpg',
  },
  methods: {
  	showFormdata(){ 
  		var hour =document.querySelector("#hour").value;
  		var minute =document.querySelector("#minute").value;
  		var meridium =document.querySelector("#meridium").value;
      var hourNew = hour;
          if(meridium === 'PM') {
            hourNew = parseInt(hour)+ 12;
          }
          var time = hourNew+':'+minute; 
  		this.scheduleForm = {hour:hourNew,minute:minute, time: time, meridium:meridium, enabled: true, sent:false};
   			this.schedules.push(this.scheduleForm);
          this.storeLocally('schedules',this.schedules);
  	},

  	changeStatus(index) {
  			this.schedules[index].enabled=!this.schedules[index].enabled;
         this.storeLocally('schedules',this.schedules);
  	},

  	deleteSchedule(index) {
  			this.schedules.splice(index,1);
         this.storeLocally('schedules',this.schedules);
  	},

    setInitialScheduels() {
      var scheduleItems = JSON.parse(localStorage.getItem('schedules'));
      console.info(scheduleItems);
      if(scheduleItems && scheduleItems.length) { 
          this.schedules = scheduleItems;
      }else {
         this.storeLocally('schedules',this.schedules);
      }

    },

  	sendMessage() {
  		var MessageSetting = JSON.parse(localStorage.getItem('slack_settings'));
      var attachmentMessaage = '[{'+
            '"image_url": "'+MessageSetting.imageURL+'",'+
           ' "title": "Reminder Message!",'+
           ' "text": "'+MessageSetting.message+'",'+
           ' "color": "#7CD197"'+
        '}]';
  		if(MessageSetting && MessageSetting.token!='') {
  			$.ajax({
  			method:'POST',
  			url:'https://slack.com/api/chat.postMessage',
  			data: {
  				token: MessageSetting.token,
          channel: MessageSetting.channel,
  				as_user: true,
          attachments:attachmentMessaage
        
  			},
  			success:function(data) {
  					if(data.ok && data.ok == true) {
  						console.log('message sent ');
  					}
  			},
  			error:function(er) {
  						console.log(er);
  			}
  		});
  		}
  
  	},
    storeLocally(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
      
  	timer(){
  		var dateTime = new Date();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      hour = (parseInt(hour)<10)? '0'+hour: hour;
      minute = (parseInt(minute)<10)? '0'+minute: minute;
  		var time = hour+':'+minute;
      this.schedules.forEach(function(schedule,index) {
        if(schedule.time === time && schedule.sent === false && schedule.enabled === true){
          this.sendMessage();
          this.schedules[index].sent = true;
          this.storeLocally('schedules',this.schedules);
        }

      }.bind(this));
    console.info('timer');
  },
},
  mounted(){
  	$('select').material_select();
    this.setInitialScheduels();
  	setInterval(this.timer,5000);
  //	this.sendMessage();
  }
});


