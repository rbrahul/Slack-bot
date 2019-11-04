<template>
    <div id="schedule-setting" class="col s12">
        <div class="row">
            <div class="input-field col  s4">
                <select class="icons" id="day" multiple>
                    <option value="" disabled selected>Day</option>
                    <option value="7">Any days</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="0">Sunday</option>
                </select>
            </div>

            <div class="input-field col  s4">
                <select class="icons" id="hour" multiple>
                    <option value="" disabled selected>Hour</option>
                    <option value="25">Any Hours</option>
                    <option value="00">00</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                </select>
            </div>

            <div class="input-field col  s4">
                <select class="icons" id="minute">
                    <option value="" disabled selected>Minute</option>
                    <option value="00">00</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                </select>
            </div>
            
            <div class="input-field col  s4">
                <select class="icons" id="recurrent">
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
            </div>

            <div class="input-field col  s1">
                <a class="btn-floating btn-sm right" @click="saveFormdata"><i class="material-icons">add</i></a>
            </div>
        </div>
        <!-- .row -->
        <div class="card-panel grey lighten-5 z-depth-1">
            <strong> Schedules</strong>
            <a class="btn-floating btn-sm left" @click="clear"><i class="material-icons">clear all</i></a>
            <div class="row valign-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th data-field="id">#</th>
                        <th data-field="Day">Day</th>
                        <th data-field="Time">Time</th>
                        <th data-field="Recurrent">Recurrent</th>
                        <th data-field="Channel">Channel</th>
                        <th data-field="Title">Title</th>
                        <th data-field="message">Message</th>
                        <th data-field="name">Change Status</th>
                        <th data-field="name">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(schedule, index) in schedules">
                        <td>{{index+1}}</td>
                        <td>{{["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][schedule.day]}}</td>
                        <td>{{schedule.hour+ ':'+ schedule.minute}}</td>
                        <td>{{schedule.recurrent == "true" ? "true" : "false"}}</td>
                        <td>{{schedule.channel}}</td>
                        <td>{{schedule.title}}</td>
                        <td>{{schedule.message}}</td>
                        <td><img :src=schedule.imageURL alt="" class="responsive-img"></td>
                        <td>
                            <a class="btn btn-xs" v-if="!schedule.enabled" @click="changeStatus(index)">Enable</a>

                            <a class="btn btn-xs red" v-if="schedule.enabled" @click="changeStatus(index)">Disable</a>
                        </td>
                        <td>
                            <a class="btn-floating btn-sm red" @click="deleteSchedule(index)">
                                <i class="material-icons left">delete</i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- .tab2 -->
</template>

<script>
    function getSelectValues(select) {
               var result = [];
               var options = select && select.options;
               var opt;

               for (var i=0, iLen=options.length; i<iLen; i++) {
                  opt = options[i];
                  if (opt.selected) {
                      result.push(opt.value);
                  }
               }
               return result;
            };
    export default {
        name: 'schedule-setting',
        data() {
            return {
                scheduleForm: {},
                schedules: []
            };
        },
        methods: {
            saveFormdata() {
                const MessageSetting = JSON.parse(localStorage.getItem('slack_settings'));
                let days = getSelectValues(document.querySelector("#day"));
                let hours = getSelectValues(document.querySelector("#hour"));
                const minute = document.querySelector("#minute").value;
                const recurrent = document.querySelector("#recurrent").value == "true";
                const dateTime = new Date();
                let c_day = dateTime.getDay();
                let c_hour = dateTime.getHours();
                let c_min = dateTime.getMinutes(); 
                let c_sec = dateTime.getSeconds();
                console.log(JSON.stringify(days));
                console.log(JSON.stringify(hours));
                if (MessageSetting && MessageSetting.token != '' && minute != "" && days.length > 1 && hours.length > 1) {
                    console.log("valid");
                    let i = 0;
                    let j = 0;
                    hours.splice(hours.indexOf(""), 1);
                    if (hours.includes("25")) {
                       if (recurrent) {
                           hours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
                       } else {
                           hours.splice(hours.indexOf("25"), 1);
                           hours.push((c_min < minute) && (c_sec < 59) ? c_hour : c_hour+1);
                      }
                    }
                    days.splice(days.indexOf(""), 1);
                    if (days.includes("7")) {
                       if (recurrent) {
                           days = [0,1,2,3,4,5,6];
                       } else {
                           days.splice(days.indexOf("7"), 1);
                           console.log(Math.max(hours)-1);
                           days.push((c_hour == Math.max(Math.min(hours), 0) && (c_min < minute) && (c_sec < 59)) || (c_hour < Math.max(Math.min(hours), 0)) ? c_day : c_day+1);
                      }
                    }
                    for (i = 0; i < days.length; i++) {
                       const day = days[i];
                       for (j = 0; j < hours.length; j++) {
                         const hour = hours[j];
                         const time = '' + day + 'wd ' + hour + ':' + minute;
                         this.scheduleForm = {
                            day: day,
                            hour: hour,
                            minute: minute,
                            time: time,
                            enabled: true,
                            recurrent: recurrent,
                            sent: false,
                            title: MessageSetting.title,
                            message: MessageSetting.message,
                            imageURL: MessageSetting.imageURL,
                            token: MessageSetting.token,
                            channel: MessageSetting.channel
                         };
                         this.schedules.push(this.scheduleForm);
                         this.storeLocally('schedules', this.schedules);
                         console.log(JSON.stringify(this.scheduleForm));
                       }
                    }
                }
                console.log('forme save passed');
            },

            clear() {
                this.schedules = [];
                this.storeLocally('schedules', []);
            },

            changeStatus(index) {
                this.schedules[index].enabled = !this.schedules[index].enabled;
                this.storeLocally('schedules', this.schedules);
            },

            deleteSchedule(index) {
                this.schedules.splice(index, 1);
                this.storeLocally('schedules', this.schedules);
            },

            setInitialScheduels() {
                const scheduleItems = JSON.parse(localStorage.getItem('schedules'));
                console.info(scheduleItems);
                if (scheduleItems && scheduleItems.length) {
                    this.schedules = scheduleItems;
                } else {
                    this.storeLocally('schedules', this.schedules);
                }

            },

            sendMessage(schedule) {
                const attachmentMessage = '[{' +
                        '"image_url": "' + schedule.imageURL + '",' +
                        ' "title": "' + schedule.title + '",' +
                        ' "text": "' + schedule.message + '",' +
                        ' "color": "#7CD197"' +
                        '}]';
                 $.ajax({
                        method: 'POST',
                        url: 'https://slack.com/api/chat.postMessage',
                        data: {
                            token: schedule.token,
                            channel: schedule.channel,
                            as_user: true,
                            attachments: attachmentMessage
                        },
                        success: function (data) {
                            if (data.ok && data.ok == true) {
                                console.log('message sent ');
                            }
                        },
                        error: function (er) {
                            console.log(er);
                        }
                    });

            },
            storeLocally(key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            },

            timer(){
                const dateTime = new Date();
                let day = dateTime.getDay();
                let hour = dateTime.getHours();
                let minute = dateTime.getMinutes();
                hour = (parseInt(hour) < 10) ? '0' + hour : hour;
                minute = (parseInt(minute) < 10) ? '0' + minute : minute;
                const time = day + 'wd ' + hour + ':' + minute;
                this.schedules.forEach((schedule, index) => {
                    if (schedule.time === time && schedule.sent === false && schedule.enabled === true) {
                        this.sendMessage(schedule);
                        if (schedule.recurrent == false) {
                           this.schedules[index].sent = true;
                        }
                        this.storeLocally('schedules', this.schedules);
                    }

                });
            },
        },
        mounted(){
            $('select').material_select();
            this.setInitialScheduels();
            setInterval(this.timer, 5000);
        }
    }
</script>
