import { LightningElement } from 'lwc';
import geminiApiHandler from '@salesforce/apex/callToGemini.geminiApiHandler'


export default class ChatGPTComp extends LightningElement {

    isLoading=false

    getResponsefromGPT

    searchInputFromUser=''

    inputChangeHandler(event){

        this.searchInputFromUser = event.target.value
    }


    onClickHandler(){

        this.isLoading = true

        geminiApiHandler({text : this.searchInputFromUser})
        .then(detail =>{

            // this.getResponsefromGPT = detail; 
            // console.log('res grom gemini===>'+this.getResponsefromGPT);  
            
            // console.log(this.searchInputFromUser);

            let parseResponse = JSON.parse(detail)



            this.getResponsefromGPT = parseResponse.candidates[0].content.parts[0].text

            
        })
        .catch(error=>{
            console.log(error);
            
        })
        .finally(()=>{
            this.isLoading=false
        })

    }   




}