import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CardSelectedNauta from '../CardSelected/CardSelectedNauta';

export const SelectedPlanNauta = ({data, datacomp}) => {
    console.log('SelectedPlan', data)
    console.log('datacomp', datacomp)

    return(
        <div >
            {data.map((item, index) => (
                <div key={index}>
                    <div className="col-md-4">
                        
                            <CardSelectedNauta
                                index={index}
                                name={item.name}
                                price={item.plans[0].phases[0].prices[0].value}
                                data={data}
                                datacomp={datacomp}
                            />
                        
                    </div>
                </div>
            ))}    
        </div>
    )    
}
