<template>
    <div id="schedule-setting" class="col s12">
        <div class="row">
            <div class="input-field col  s4">
                <select class="icons" id="hour">
                    <option value="" disabled selected>Hour</option>
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
                </select>
            </div>

            <div class="input-field col  s4">
                <select class="icons" id="minute">
                    <option value="" disabled selected>Minute</option>
                    <option value="00">00</option>
                    <option value="05">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                </select>
            </div>

            <div class="input-field col  s3">
                <select class="icons" id="meridium">
                    <option value="AM" selected="selected">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <div class="input-field col  s1">
                <a class="btn-floating btn-sm right" @click="saveFormdata"><i class="material-icons">add</i></a>
            </div>
        </div>
        <!-- .row -->
        <div class="card-panel grey lighten-5 z-depth-1">
            <strong> Schedules</strong>
            <div class="row valign-wrapper">
                <table>
                    <thead>
                    <tr>
                        <th data-field="id">#</th>
                        <th data-field="Time">Time</th>
                        <th data-field="name">Change Status</th>
                        <th data-field="name">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(schedule, index) in schedules">
                        <td>{{index+1}}</td>
                        <td>{{schedule.hour+ ':'+ schedule.minute + ' '+schedule.meridium}}</td>
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
    export default {
        name: 'schedule-setting',
        data() {
            return {
                scheduleForm: {hour: '10', minute: '30', meridium: 'AM'},
                schedules: [
                    {hour: '05', minute: '05', time: '17:05', meridium: 'AM', enabled: true, sent: false},
                ],
                imageURL: 'http://static.thousandwonders.net/Qol%C5%9F%C3%A4rif.Mosque.original.14573.jpg',
            };
        },
        methods: {
            saveFormdata(){
                const hour = document.querySelector("#hour").value;
                const minute = document.querySelector("#minute").value;
                const meridium = document.querySelector("#meridium").value;
                if (hour && minute) {
                    let hourNew = hour;
                    if (meridium === 'PM') {
                        hourNew = parseInt(hour) + 12;
                    }
                    const time = hourNew + ':' + minute;
                    this.scheduleForm = {
                        hour: hour,
                        minute: minute,
                        time: time,
                        meridium: meridium,
                        enabled: true,
                        sent: false
                    };
                    this.schedules.push(this.scheduleForm);
                    this.storeLocally('schedules', this.schedules);
                }

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

            sendMessage() {
                const MessageSetting = JSON.parse(localStorage.getItem('slack_settings'));
                const attachmentMessaage = '[{' +
                        '"image_url": "' + MessageSetting.imageURL + '",' +
                        ' "title": "Reminder Message!",' +
                        ' "text": "' + MessageSetting.message + '",' +
                        ' "color": "#7CD197"' +
                        '}]';
                if (MessageSetting && MessageSetting.token != '') {
                    $.ajax({
                        method: 'POST',
                        url: 'https://slack.com/api/chat.postMessage',
                        data: {
                            token: MessageSetting.token,
                            channel: MessageSetting.channel,
                            as_user: true,
                            attachments: attachmentMessaage

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
                }

            },
            storeLocally(key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            },

            timer(){
                const dateTime = new Date();
                let hour = dateTime.getHours();
                let minute = dateTime.getMinutes();
                hour = (parseInt(hour) < 10) ? '0' + hour : hour;
                minute = (parseInt(minute) < 10) ? '0' + minute : minute;
                const time = hour + ':' + minute;
                this.schedules.forEach((schedule, index) => {
                    if (schedule.time === time && schedule.sent === false && schedule.enabled === true) {
                        this.sendMessage();
                        this.schedules[index].sent = true;
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