import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {useCreateContext} from '~/components/templates/create/context';
import CreateForm from '~/components/templates/create/form';
import CreatePagination from '~/components/templates/create/pagination';

import Header from '~/components/regions/header';
import Footer from '~/components/regions/footer';
import ProgressBar from '~/components/atoms/progress-bar';
import Toast from '~/components/regions/toast';
import CenterMarker from '~/components/molecules/markers/center';
import {useNavigate, useTransition} from '@remix-run/react';
import {Warning} from '~/components/composites/warning';

export default function CreateIndexTemplate() {
  const {state} = useTransition();
  const navigate = useNavigate();

  const {stage} = useCreateContext();

  const methods = useForm({
    defaultValues: {
      type: '',
      severity: '',
    },
    mode: 'onChange',
  });

  return (
      <>
        <CenterMarker/>
        <Toast show={state === 'submitting'} content="Uploading report..."/>
        <FormProvider {...methods}>
          <Warning>
            <Header>
              <div className="flex flex-col bg-white">
                <div className="flex flex-row p-2">
                  <Warning.Trigger className="btn btn-light">
                    <i className="btn-icon icon icon-arrow-left"/>
                  </Warning.Trigger>
                  <div className="flex flex-col px-3">
                    <h3 className="font-medium">{stage.heading}</h3>
                    <p className="text-sm text-base-400">
                      Step {stage.step} of 4
                    </p>
                  </div>
                </div>
                <ProgressBar value={stage.progress}/>
              </div>
            </Header>
            <Footer>
              <div className="divider-gray-200 flex flex-col divide-y bg-white">
                <div className="p-3">
                  <p className="text-base">{stage.description}</p>
                </div>
                <div className="space-y-2 p-2">
                  <CreateForm/>
                </div>
                <div className="flex flex-row justify-between p-2">
                  <CreatePagination/>
                </div>
              </div>
            </Footer>
            <Warning.Panel
                heading="Cancel Report Submission"
                body="Are you sure you want to cancel this submission? All data submitted up to this point will be lost."
                onConfirm={() => navigate('/')}
            />
          </Warning>
        </FormProvider>
      </>
  );
}
