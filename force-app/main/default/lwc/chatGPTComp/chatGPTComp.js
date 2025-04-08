import { LightningElement } from 'lwc';
import geminiApiHandler from '@salesforce/apex/callToGemini.geminiApiHandler'
import { loadScript } from 'lightning/platformResourceLoader';
import marked from '@salesforce/resourceUrl/marked';


export default class ChatGPTComp extends LightningElement {

    isLoading=false

    getResponsefromGPT

    searchInputFromUser=''

    markdownInitialized = false;
 
    renderedCallback() {
        if (this.markdownInitialized) return;
        this.markdownInitialized = true;
 
        loadScript(this, marked)
            .then(() => {
                console.log('Marked library loaded');
                
            })
            .catch(error => {
                console.error('Error loading marked:', error);
            });
    }

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
// ======================
            // let parseResponse = JSON.parse(detail)



            // this.getResponsefromGPT = parseResponse.candidates[0].content.parts[0].text
// ==================================        

                let parseResponse = JSON.parse(detail);
                const rawText = parseResponse.candidates[0].content.parts[0].text;
 
                this.getResponsefromGPT = rawText;
 
                const html = window.marked.parse(rawText);
                this.template.querySelector('[data-id="responseContainer"]').innerHTML = html;
            
        })
        .catch(error=>{
            console.log(error);

            this.formattedResponse = [{ text: 'An error occurred.', id: Date.now() }];

            
        })
        .finally(()=>{
            this.isLoading=false
        })

    }   
}


// import { LightningElement, track } from 'lwc';
// import { loadScript } from 'lightning/platformResourceLoader';
// import marked from '@salesforce/resourceUrl/marked';
// import geminiApiHandler from '@salesforce/apex/callToGemini.geminiApiHandler';
 
// export default class ChatGPTComp extends LightningElement {
//     @track getResponsefromGPT = '';
//     searchInputFromUser = '';
//     isLoading = false;
//     markdownInitialized = false;
 
//     renderedCallback() {
//         if (this.markdownInitialized) return;
//         this.markdownInitialized = true;
 
//         loadScript(this, marked)
//             .then(() => {
//                 console.log('Marked library loaded');
//             })
//             .catch(error => {
//                 console.error('Error loading marked:', error);
//             });
//     }
 
//     inputChangeHandler(event) {
//         this.searchInputFromUser = event.target.value;
//     }
 
//     onClickHandler() {
//         this.isLoading = true;
 
//         geminiApiHandler({ text: this.searchInputFromUser })
//             .then(detail => {
//                 let parseResponse = JSON.parse(detail);
// const rawText = parseResponse.candidates[0].content.parts[0].text;
 
//                 this.getResponsefromGPT = rawText;
 
//                 const html = window.marked.parse(rawText);
//                 this.template.querySelector('[data-id="responseContainer"]').innerHTML = html;
//             })
//             .catch(error => {
//                 console.log(error);
//                 this.getResponsefromGPT = 'An error occurred while fetching the response.';
//                 this.template.querySelector('[data-id="responseContainer"]').innerHTML = `<p>${this.getResponsefromGPT}</p>`;
//             })
//             .finally(() => {
//                 this.isLoading = false;
//             });
//     }
// }