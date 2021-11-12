<template>
    <div class="bdy">  
            <label>Введите количество у.е.: <input type="number" value="100" v-model="start_value"></label>
            <label>Конвертировать ИЗ (Валюта 1) <input list="currency"  v-model="start_ccy"></label>
            <datalist id="currency">
              <option value="USD"> </option>
              <option value="EUR"> </option>
              <option value="RUR"> </option>
            </datalist>
            <label>в (валюта 2) <input list="currency" v-model="end_ccy"></label>
            <button v-on:click="convert">Конвертировать</button>
            <br><br><label>{{result}}{{end_value | roundValue}}{{end_ccy}}</label>
   </div>
   
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

   export default {
    data: function() {
           return {
            currency: [],
            start_ccy: "",
            end_ccy: "",
            sell: 0,
            buy: 0,
            start_value: 0,
            end_value: 0,
            result: "",
        }},
    
    mounted: function() {
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response)=>{
            console.log(response.data);
            this.currency = response.data;
        })
    },
    
    methods:{
        convert:function(){
            for(let i=0; i<this.currency.length; i++){
                if (this.currency[i].ccy==this.start_ccy)
                      this.sell=this.currency[i].sale;
                if (this.currency[i].ccy==this.end_ccy)
                      this.buy=this.currency[i].buy;
            }
            this.end_value=(this.start_value*this.sell)/this.buy;
            this.result = this.start_value + " " + this.start_ccy + " = " ;
            
        },
    },

    filters:{
            roundValue: function(value){
                return parseFloat(value.toFixed(2));
            },
        },
    }   
</script>