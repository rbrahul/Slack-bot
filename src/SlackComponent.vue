<template>
    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s3"><a  class="active" href="#message-setting">Settings</a></li>
          <li class="tab col s3"><a href="#schedule-setting">Schedules</a></li>
        </ul>
      </div>
 <MessageSetting/>
<ScheduleSetting/>
    </div>
</template>

<script>
import MessageSetting from './components/MessageSetting.vue'
import ScheduleSetting from './components/ScheduleSetting.vue'

export default {
  name: 'SlackComponent',
  components: {
    MessageSetting,
    ScheduleSetting
  }
}
</script>

