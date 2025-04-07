public with sharing class callToGemini {

    @AuraEnabled
    public static String geminiApiHandler(String text){
        try {

          // String text = 'what is salesforec';

          String API_KEY = Gemini_Key__c.getOrgDefaults().Gemini_API_Key__c ;

            Http http = new Http();

            HttpRequest req = new HttpRequest();

            String requestBody = '{ "contents": [ { "parts": [ { "text": "' + String.escapeSingleQuotes(text) + '" } ] } ] }';

            // String requestBody = '{'+
            //             '"contents": ['+
            //                ' {'+
            //                 '"parts": ['+
            //                      '{'+
            //          '"text": "How does AI work?"'+
            //             '}'+
            //                 ']'+
            //                     '}'+
            //                 ']'+
            //             '}';

            req.setMethod('POST');
            req.setEndpoint('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+API_KEY);
            req.setHeader('Content-type','application/json');
            req.setBody(requestBody);

            req.setTimeout(120000); 

            HttpResponse res = http.send(req);

            System.debug(res.getBody());
            System.debug(res.getStatus());

            return res.getBody();


            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

}


