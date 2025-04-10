trigger leadRevenueTrigger on Lead (before update) {

    if(Trigger.isBefore && Trigger.isUpdate){

        for(Lead lead : Trigger.new){

            if(lead.AnnualRevenue > 100000){

                lead.description = 'High value Lead';
            }
        }
    }

}