import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardSelectedNauta from '../CardSelected/CardSelectedNauta';

export const SelectedPlanNauta = ({data}) => {
    console.log('SelectedPlan', data)

    return(
        <div >
            {data.map((item, index) => (
                <div key={index}>
                    <div className="col-md-4">
                        
                            <CardSelectedNauta
                                index={index}
                                name={item.name}
                                price={item.plans[0].phases[0].prices[0].value}
                            />
                        
                    </div>
                </div>
            ))}    
        </div>
    )    
}
