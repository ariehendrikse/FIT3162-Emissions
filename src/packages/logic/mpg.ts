import Vehicle from "../model/Vehicle";
import {CO2Profile} from "../model/Vehicle";

 export type Node = {
    routeIndex: number
    legIndex: number
    stepIndex: number
    vehicleIndex:number
    emissions:number
  }

 export type HasEmissions=
  {
      routeIndex?:number
      vehicleIndex?:number
      emissions?:number

  }

const mpgTo100lkm = (mpg: number) => (((1 / mpg)*3.78541)/1.609344)*100;

export class MinHeap {
    private list: Array<Node>;

    constructor(){
        this.list=[];
    }

    public insert(element:Node)
    {
        this.list.push(element);
        this.heapUp();

    }

    public isEmpty():Boolean
    {
        return this.list.length<=0;
    }

    public getMin():Node {
        if(this.list.length>0)
        {
            let min=this.list[0];
            this.list[0]=this.list[-1];
            this.list.pop();
            this.heapDown();
            return min;

        }
        return {routeIndex: -1, legIndex: -1, stepIndex: -1 ,vehicleIndex:-1,emissions:-1};
    }

    private heapUp(index: number = this.list.length-1)
    {
        let parent=this.parent(index);
        if(parent>=0 && this.list[parent].emissions>this.list[index].emissions)
        {
            this.swap(parent,index);
            this.heapUp(parent);
        }

    }

    private heapDown(index: number = 0)
    {
        let minimum= index;
        let right=this.rightChild(index);
        let left=this.leftChild(index);

        if (right<this.list.length && this.list[index].emissions>this.list[right].emissions)
        {
            minimum=right;
        }

        if(left<this.list.length && this.list[minimum].emissions>this.list[left].emissions)
        {
            minimum=left;
        }

        if (minimum!== index)
        {
            this.swap(index,minimum);
            this.heapDown(minimum);

        }

    }

    private parent(index: number)
    {
        if(index>=0)
        {
           return Math.floor((index-1)/2)
            
        }
        return -1
    }

    private rightChild(index:number)
    {
        if (index>=0)
        {
            return 2*index+2
        }

        return this.list.length+100
    }

    private leftChild(index:number)
    {
        if (index>=0)
        {
            return 2*index+1
        }

        return this.list.length+100
    }

    private swap(parent:number,child:number)
    {
        let temp=this.list[parent];
        this.list[parent]=this.list[child];
        this.list[child]=temp;
    }

}

export function optimalPathEmissions(routes: google.maps.DirectionsRoute[], vehicles:Vehicle[]):HasEmissions
{
   
   let solution:HasEmissions={};
   let minqueue:MinHeap= new MinHeap();
   let foundGoal:Boolean=false;

   //initial seeding
   for (let i:number=0; i++ ; i<routes.length)
   {
       for (let j:number=0;j++;j<vehicles.length)
       {
          let profile=vehicles[j].co2_profile
           if(profile)
           {
           
            
  
            let firstStepDistance:number= routes[i].legs[0].steps[0].distance.value;
  
            let firstStepDuration:number=routes[i].legs[0].steps[0].duration.value;
  
            let emissionVal:number= getEmissions(firstStepDistance,firstStepDuration,profile);

            if(emissionVal>=0)
            {
                let node:Node={routeIndex:i,legIndex:0,stepIndex:0,vehicleIndex:j,emissions:emissionVal};

                minqueue.insert(node);

            }

            

           }
          


       }
   }

   while(!foundGoal && !minqueue.isEmpty())
   {
       let minimumOption=minqueue.getMin();
       if (minimumOption.emissions===-1)
       {
           break;
       }
       

       let route:number=minimumOption.routeIndex;
       let leg:number=minimumOption.legIndex;
       let step:number=minimumOption.stepIndex;
       let vehicle:number=minimumOption.vehicleIndex;
       let emissionAccum:number=minimumOption.emissions;

       if(step===routes[route].legs[leg].steps.length-1)
       {
           if(leg===routes[route].legs.length-1)
           {
               foundGoal=true;
               solution.routeIndex=route;
               solution.vehicleIndex=vehicle;
               solution.emissions=emissionAccum;
               break;


           }

           if(leg<routes[route].legs.length-1)
           {
               leg+=1
               step=0
           }


       }

       else if(step<routes[route].legs[leg].steps.length-1)
       {
           step+=1
       }

       if(step<routes[route].legs[leg].steps.length)
       {
        let dist:number=routes[route].legs[leg].steps[step].distance.value;
        let dur:number=routes[route].legs[leg].steps[step].duration.value;
        let Cprofile=vehicles[vehicle].co2_profile;
 
        if(Cprofile )
        {
         let addEmissions:number=getEmissions(dist,dur,Cprofile);

         if(addEmissions>=0)
         {
            emissionAccum=emissionAccum+addEmissions;
            let childNode:Node={routeIndex:route,legIndex:leg,stepIndex:step,vehicleIndex:vehicle,emissions:emissionAccum};
            minqueue.insert(childNode);

         }
         
 
 
        }

       }

       

       

   }

   return solution;




}

export function getEmissions(distance:number,duration:number,emissionProfile:CO2Profile)
{
    //adjusted distance and duration to kilometers and hours
    distance=distance/1000
    duration=duration/3600
    let speed= (distance)/(duration); 
    if (emissionProfile.highway && emissionProfile.combined && emissionProfile.urban)
    {
        if (speed<=33 )
    {
        return emissionProfile.urban * distance;
    }

    if (speed>33 && speed<=66 )
    {
        let gradient= (emissionProfile.combined-emissionProfile.urban)/33;

        let emissionsvalue= (((speed-33)*gradient)+emissionProfile.urban)*distance;

        return emissionsvalue
    }

    

    if(speed>66 && speed<=100)
    {
        let gradient= (emissionProfile.highway-emissionProfile.combined)/34; 

        let emissionsvalue= (((speed-66)*gradient)+emissionProfile.combined)*distance;

        return emissionsvalue


    }

    //must be over 100 km/h
    return emissionProfile.highway*distance
     }


    return -1

    

}

    



export default mpgTo100lkm