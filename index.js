
var ProjectModule = (function() {
     return {
        getInstance: function () {
            return {
                participants: [

                ],
                pricing: {
                    
                },
                isBusy: false,

                /* implement initialization of the object */
                /* participants - predefined array of participants */
                /* pricing - predefined object (keyvalue collection) of pricing */
                init(participants, pricing) {
                    this.isBusy = true;
                    if(Array.isArray(participants)){
                        if(participants.length == 0 || participants.every((item) => 'seniorityLevel' in item)) {
                            this.participants = participants;
                        }
                    }
                    if (typeof pricing === "object" && pricing != null) {
                        this.pricing = pricing;
                    }
                    this.isBusy = false;
                },

                /* pass found participant into callback, stops on first match */
                /* functor - function that will be executed for elements of participants array */
                /* callbackFunction - function that will be executed with found participant as argument or with null if not */
                /* callbackFunction (participant) => {} */
                findParticipant(functor, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(function(){
                        let a = this.participants.find(functor);
                        if (a === undefined){
                            callbackFunction(null);  
                        } else {
                            callbackFunction(a);
                        }
                        this.isBusy = false;
                    }, 10);
                },

                /* pass array of found participants into callback */
                /* functor - function that will be executed for elements of participants array */
                /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
                /* callbackFunction (participantsArray) => {} */
                findParticipants(functor, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(function(){
                        callbackFunction(this.participants.filter(functor));
                        this.isBusy = false;
                    }, 10);
                },

                /* push new participant into this.participants array */
                /* callbackFunction - function that will be executed when job will be done */
                /* (err) => {} */
                addParticipant(participantObject, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(() => {
                        try {
                            if (typeof participantObject === 'object' && 'seniorityLevel' in participantObject){
                                this.participants.push(participantObject);
                                callbackFunction();     
                            } else {
                               throw new Error('Wrong!');
                            }
                        } catch(err){
                            callbackFunction(err);   
                        }
                        this.isBusy = false;
                    }, 10);
                },

                /* push new participant into this.participants array */
                /* callback should receive removed participant */
                /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
                removeParticipant(participantObject, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(function(){
                        var removed = null;
                        for(var i = 0; i < this.participants.length; i++){
                            if(this.participants[i] == participantObject){
                                removed = this.participants.splice(i,1)[0];
                                break;
                            }
                        }
                        callbackFunction(removed);
                        this.isBusys = false;
                    }, 10);
                },

                /* Extends this.pricing with new field or change existing */
                /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
                setPricing(participantPriceObject, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(function(){
                        Object.assign(this.pricing, participantPriceObject);
                        callbackFunction();
                        this.isBusy = false;
                    }, 10);
                },

                /* calculates salary of all participants in the given period */
                /* periodInDays, has type number, one day is equal 8 working hours */
                calculateSalary(periodInDays) {
                    var hours = 8;
                    var salary = this.participants.reduce(function(sum, i){
                        return sum + this.pricing[i.seniorityLevel] * periodInDays * hours;
                    }, 0);
                    if(!isNaN(salary)){
                        return salary;
                    } else {
                        throw new Error('something wrong');
                    }
                }
            }
        }
     }
})();


module.exports = {
   firstName: 'Dmytro',
   lastName: 'Chorny',
   task: ProjectModule.getInstance()
}
