<template>
    <div id="dashboard" class="d-flex align-items-stretch">
        <sidemenu/>
        <div class="board px-5 pb-5">
            <div class="row">
                <div class="col-sm-12 d-flex header justify-content-between mb-3" style="color: white">
                    <span>
                        <strong>Message:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aperiam!
                    </span>
                    <icon :icon="'mdi-bell'" :badge="12"></icon>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-8">
                    <dashboard-box :title="'Statistics'">
                        <div class="d-flex justify-content-around p-4">
                            <doughnut-chart :title="'CPU usage'" :value="'35%'" :actionTitle="'detail'" @onAction="action()"></doughnut-chart>
                            <doughnut-chart :title="'RAM usage'" :value="'10%'" :colors="['#FCD43E', '#FFB700']" :actionTitle="'detail'"></doughnut-chart> 
                            <doughnut-chart :title="'Disk space'" :value="'66%'" :colors="['#FF86AE', '#F9709A']" :actionTitle="'detail'"></doughnut-chart>
                        </div>       
                    </dashboard-box>
                </div>
                <div class="col-sm-4">
                    <dashboard-box :title="'Chat'">
                       <chat height="270px" :messages="messages" :people="people"/>
                    </dashboard-box>
                </div> 
            </div>
            <div class="row">
                <div class="col-sm-12 mt-4">
                    <dashboard-box :title="'Usage'">
                    </dashboard-box>
                </div>  
            </div>
            <div class="row">
                <div class="col-sm-12 mt-4">
                    <dashboard-box :title="'History'">
                        
                    </dashboard-box>
                </div>  
            </div>
        </div>
    </div>
</template>

<script>
import Sidemenu from './Sidemenu';
import DashboardBox from './ui/dashboard-box/dashboard-box';
import DoughnutChart from './charts/doughnut/doughnut-chart';
import Icon from './ui/icon/icon';
import Chart from './charts/chart-js';
import Chat from './chat/chat';

export default {
    name: 'dashboard',
    data() {
        return {
            test: 'test',
            messages: [
                {
                    id: '1',
                    text: 'hello world',
                    time: 1505064592476,
                    user: '1',
                },
                {
                    id: '2',
                    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae voluptate voluptates, quia quasi totam quis perspiciatis id sequi pariatur adipisci unde quae impedit repellat dolores rerum quos ipsa cum?',
                    time: 1505064592476,
                    user: '1',
                },
                {
                    id: '3',
                    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae voluptate voluptates, quia quasi totam quis perspiciatis id sequi pariatur adipisci unde quae impedit repellat dolores rerum quos ipsa cum?',
                    time: 1505064592476,
                    user: '1',
                },
                {
                    id: '4',
                    text: 'hello...',
                    time: 1505064592476,
                    user: '2',
                }
            ],
            people: [
                {
                    id: '1',
                    name: 'Jan Lipnican',
                    isUser: true,
                },
                {
                    id: '2',
                    name: 'John Doe',
                }
            ],
        };
    },
    methods: {
        action() {
            console.log('lol');
        },
    },
    components: {
        sidemenu: Sidemenu,
        icon: Icon,
        chart: Chart,
        Chat,
        'dashboard-box': DashboardBox,
        'doughnut-chart': DoughnutChart,
    },
};
</script>

<style lang="scss" scoped>
#dashboard {
    .header {
        margin-top: 12px;
        .bell {
            font-size: 24px;
        }
    }
    min-height: 100%;
    display: block;
    position: relative;
    $color-a: #a33e7e;
    $color-b: #8e44ad;
    background: $color-a;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, $color-b, $color-a);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, $color-b, $color-a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.board {
    width: 100%;
}
</style>

