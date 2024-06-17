import React from 'react';
import ApplicationCard from '../application-card-component/application-card';
export default function ApplicationList() {
  return (
    <div className='application-list' id="application_list" >
      <ApplicationCard
        companyName={'McDonalds'}
        dateApplied={'10 / 25 / 2023'}
        status={'Applied'}
        role={'Branch Manager'}
        notes={'Am I aiming too high???'}
      />
      <ApplicationCard
        companyName={'Wendys'}
        dateApplied={' 02 / 22 / 2024'}
        status={'Rejected'}
        role={'Cashier'}
        notes={'Manager said I have to be better at math'}
      />
      <ApplicationCard
        companyName={'Burger King'}
        dateApplied={'04 / 15 / 2024'}
        status={'Have not heard back'}
        role={'Custodian'}
        notes={'Please hire me!!!'}
      />
    </div>
  );
}
