<template>
    <div id="message-setting" class="col s12">
        <form class="col s12">
            <div class="row">
                <div class="row">
                    <div class="input-field col s6">
                        <input placeholder="#channel-name" type="text" v-model="settings.channel" class="validate">
                        <label for="first_name">Slack Channel</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="last_name" type="password" class="validate" v-model="settings.token">
                        <label for="last_name">Slack API Token</label>
                    </div>
                </div>

                <div class="input-field col s12">
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea id="icon_prefix2" class="materialize-textarea" v-model="settings.message"></textarea>
                    <label for="icon_prefix2">Message</label>
                </div>

                <div class="input-field col s12">
                    <i class="material-icons prefix">mode_edit</i>
                    <input placeholder="Placeholder" v-model="settings.imageURL" type="text" class="validate">
                    <label for="icon_prefix2">Image URL</label>
                </div>

            </div>

            <a class="waves-effect waves-light btn" @click="saveMessageSettings"><i
                    class="material-icons left">cloud</i>Save</a>
        </form>

        <div class="col s12 ">
            <div class="card-panel grey lighten-5 z-depth-1">
                <div class="row valign-wrapper">
                    <div class="col s3">
                        <img :src="settings.imageURL" alt="" class="responsive-img"> <!-- notice the "circle" class -->
                    </div>
                    <div class="col s9">
                        <h5 class="black-text">
                            {{settings.message}}
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MessageSetting',
        data() {
            return {
                settings: {
                    message: 'Please don\'t forget about Namaz',
                    channel: '',
                    token: '',
                    imageURL: 'http://static.thousandwonders.net/Qol%C5%9F%C3%A4rif.Mosque.original.14573.jpg'
                }
            }
        },
        methods: {
            saveMessageSettings() {
                localStorage.setItem('slack_settings', JSON.stringify(this.settings));
            },
            setDefaultSettings() {
                this.settings = JSON.parse(localStorage.getItem('slack_settings'));
            }
        },
        mounted() {
            const settings = localStorage.getItem('slack_settings');
            if (!settings) {
                this.saveMessageSettings();
            }
            this.setDefaultSettings();
            $(document).ready(function () {
                $('ul.tabs').tabs();
            });
        }
    }

</script>