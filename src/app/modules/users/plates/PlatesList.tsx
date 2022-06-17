import {useEffect, useMemo, useState} from 'react'
import { httpClient } from '../../../../api/api';
import { ApiPath } from '../../../../api/constans';
import { KTCard, KTCardBody } from '../../../../_metronic/helpers'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend';
import { Plate } from './constants';

import { PlateCard } from './PlateCard';

const PlatesList = () => {
  const [data, setData] = useState<Array<Plate>>([]);

  const getListPlates = async () => {
    const { data: { data } } = await httpClient.get(ApiPath.Plates.List);
    setData(data);
  }

  useEffect(() => {
    getListPlates();
  }, [])

  return (
    <>
      <div className='row gy-5 g-xl-8'>
        {data.map(item => (
          <div key={item.id_vta_plato} className='col-xl-4'>
            <PlateCard 
              color='primary'
              className={'mb-10'}
              data={item} />
          </div>
        ))}
      </div>
    </>
  )
}

export {PlatesList}
