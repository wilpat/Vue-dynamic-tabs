Vue.component('tabs', {
	template: `
		<div>
			<div class="tabs">
			  <ul>
			    <li v-for="tab in tabs" :class="{'is-active' : tab.isActive}" @click="selectTab(tab)">
			    	<a :href="tab.href"> {{ tab.name }} </a>
			    </li>  
			  </ul>
			</div>
			<div class ="tab-details">
				<slot></slot>
			</div>
		</div>
	`,

	data(){
		return {
			tabs: []
		}
	},

	created(){
		this.tabs = this.$children;
	},

	methods:{
		selectTab(selectedTab){
			this.tabs.forEach(tab =>{
				tab.isActive = (tab.name == selectedTab.name);
			})
		}
	}
})

Vue.component('tab', {
	template: `
		<div v-if="isActive">
			<slot></slot>
		</div>
	`,
	props: {
		name: {required: true},
		selected: { default: false}
	},
	data(){
		return {
			isActive: false
		}
	},
	mounted(){
		this.isActive = this.selected;
	},
	computed: {
		href(){
			return `#${this.name.toLowerCase().replace(/ /g, '-')}`;
		}
	}
})

new Vue({
	el: '#app'
})