// (C) Copyright 2026 Telefónica Innovación Digital (alexandremiquel.frauamar.practicas@telefonica.com, antonio.pastorperales@telefonica.com)

import { noop } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Options } from 'react-select';
import { ITestParamsTLS, ITestParamsIpsec } from '../../shared/models/quantum.interface';
import { Button, ButtonActionType, ButtonSize, ButtonStyleType } from '../../shared/components/att-button';
import { AttSelect, AttSelectOption } from '../../shared/components/att-select';
import styles from './ProtocolQuery.module.scss';
import { PROTOCOL_QUERY_EN } from './translate/en';
import { Spinner, SpinnerSize } from '../../shared/components/att-spinner';
import { useGetAlgorithms, useGetIpsec, useGetTime, useGetConnections, useGetMessageSizeIperf, useGetBandwidth, useGetIntervals, useGetIterations, useMessageSizeData } from './hooks';
import { handleAlgorithmsSelection } from './utils';
import { AlgorithmsSelectorCustomOption, SelectorCustomOption } from '../../shared/components/selector-custom-option';
import { ExperimentData } from '../all-experiments/models/experiments.interface';
import { useDuplicateData } from './hooks';

export type SelectOptionType = AttSelectOption | Options<AttSelectOption> | null;
type onTextChangedEvent = (e: React.ChangeEvent<HTMLInputElement>) => void;
type onTextAreaChangedEvent = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type OnSelectChanged = (event: SelectOptionType) => void;

export interface ProtocolQueryProps {
  isFetching: boolean;
  onRunClickTLS: (data: ITestParamsTLS) => void;
  onRunClickIpsec: (data: ITestParamsIpsec) => void;
  duplicateData?: ExperimentData;
  setDuplicateData: (data?: ExperimentData) => void;
}

export const ProtocolQuery: React.FC<ProtocolQueryProps> = (props: ProtocolQueryProps) => {
  const { isFetching, onRunClickTLS, onRunClickIpsec, duplicateData, setDuplicateData } = props;
  const { algorithmOptions, algosBySection } = useGetAlgorithms();

  const [experimentNameIperf, setExperimentNameIperf] = useState('');
  const [descriptionIperf, setDescriptionIperf] = useState('');

  const { ipsecOptions } = useGetIpsec();
  const [ipsecAlgorithms, setIpsec] = useState<AttSelectOption[]>([]);
  const [showIpsecInputOption, setShowIpsecInputOption] = useState(false);
  const [ipsecInputValue, setIpsecInputValue] = useState('');
  const [ipsecMenuIsOpen, setIpsecMenuIsOpen] = useState(false);

  const { timeOptions } = useGetTime();
  const [time, setTime] = useState<AttSelectOption[]>([]);
  const [showTimeInputOption, setShowTimeInputOption] = useState(false);
  const [timeInputValue, setTimeInputValue] = useState('');
  const [timeMenuIsOpen, setTimeMenuIsOpen] = useState(false);

  const { connectionsOptions } = useGetConnections();
  const [connections, setConnections] = useState<AttSelectOption[]>([]);
  const [showConnectionsInputOption, setShowConnectionsInputOption] = useState(false);
  const [connectionsInputValue, setConnectionsInputValue] = useState('');
  const [connectionsMenuIsOpen, setConnectionsMenuIsOpen] = useState(false);

  const { messageSizeIperfOptions } = useGetMessageSizeIperf();
  const [messageSizeIperf, setMessageSizeIperf] = useState<AttSelectOption[]>([]);
  const [showMessageSizeIperfInputOption, setShowMessageSizeIperfInputOption] = useState(false);
  const [messageSizeIperfInputValue, setMessageSizeIperfInputValue] = useState('');
  const [messageSizeIperfMenuIsOpen, setMessageSizeIperfMenuIsOpen] = useState(false);

  const { bandwidthOptions } = useGetBandwidth();
  const [bandwidth, setBandwidth] = useState<AttSelectOption[]>([]);
  const [showBandwidthInputOption, setShowBandwidthInputOption] = useState(false);
  const [bandwidthInputValue, setBandwidthInputValue] = useState('');
  const [bandwidthMenuIsOpen, setBandwidthMenuIsOpen] = useState(false);

  const { intervalsOptions } = useGetIntervals();
  const [intervals, setIntervals] = useState<AttSelectOption[]>([]);
  const [showIntervalsInputOption, setShowIntervalsInputOption] = useState(false);
  const [intervalsInputValue, setIntervalsInputValue] = useState('');
  const [intervalsMenuIsOpen, setIntervalsMenuIsOpen] = useState(false);

  const [experimentName, setExperimentName] = useState('');
  const [algorithms, setAlgorithms] = useState<SelectOptionType>();
  const [prevSelectedValues, setPrevSelectedValues] = useState<string[]>([]);
  const [description, setDescription] = useState('');

  const { iterationsOptions } = useGetIterations();
  const [iterationsCount, setIterationsCount] = useState<AttSelectOption[]>([]);
  const [showIterationsInputOption, setShowIterationsInputOption] = useState(false);
  const [iterationsInputValue, setIterationsInputValue] = useState('');
  const [iterationsMenuIsOpen, setIterationsMenuIsOpen] = useState(false);

  const { messageSizeOptions } = useMessageSizeData();
  const [messageSize, setMessageSize] = useState<AttSelectOption[]>([]);
  const [showMessageSizeInputOption, setShowMessageSizeInputOption] = useState(false);
  const [messageSizeInputValue, setMessageSizeInputValue] = useState('');
  const [messageSizeMenuIsOpen, setMessageSizeMenuIsOpen] = useState(false);

  useDuplicateData({ data: duplicateData, setDuplicateData, setExperimentName, setExperimentNameIperf, setAlgorithms, setIpsec, setTime, setConnections, setMessageSizeIperf, setBandwidth, setIntervals, setIterationsCount, setMessageSize });

  const onSubmitTLSHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRunClickTLS({
      experimentName,
      algorithms: algorithms as SelectOptionType,
      iterationsCount: iterationsCount as SelectOptionType,
      messageSizes: messageSize as SelectOptionType,
      description
    });
  };

  const onSubmitIpsecHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRunClickIpsec({
      experimentNameIperf,
      ipsecAlgorithms: ipsecAlgorithms as SelectOptionType,
      time: time as SelectOptionType,
      connections: connections as SelectOptionType,
      messageSizeIperf: messageSizeIperf as SelectOptionType,
      bandwidth: bandwidth as SelectOptionType,
      intervals: intervals as SelectOptionType,
      descriptionIperf
    });
  };

  const onExperimentNameChanged: onTextChangedEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperimentName(event.target.value);
  };

  const onExperimentNameIperfChanged: onTextChangedEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperimentNameIperf(event.target.value);
  };

  const onAlgorithmsChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const { newSelectedOptions, selectedValues } = 
      handleAlgorithmsSelection(options, algorithmOptions, algosBySection, prevSelectedValues);

    setAlgorithms(newSelectedOptions);
    setPrevSelectedValues(selectedValues);
  }, [algosBySection, algorithmOptions, prevSelectedValues]);

  const onIpsecChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedIpsec: AttSelectOption[] = options as AttSelectOption[];
    setIpsecMenuIsOpen(true);
    setIpsec(selectedIpsec);
  }, []);

  const onTimeChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedTime: AttSelectOption[] = options as AttSelectOption[];
    setTimeMenuIsOpen(true);
    setTime(selectedTime);
  }, []);

  const onConnectionsChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedConnection: AttSelectOption[] = options as AttSelectOption[];
    setConnectionsMenuIsOpen(true);
    setConnections(selectedConnection);
  }, []);

  const onMessageSizeIperfChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedMessageSizeIperf: AttSelectOption[] = options as AttSelectOption[];
    setMessageSizeIperfMenuIsOpen(true);
    setMessageSizeIperf(selectedMessageSizeIperf);
  }, []);

  const onBandwidthChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedBandwidth: AttSelectOption[] = options as AttSelectOption[];
    setBandwidthMenuIsOpen(true);
    setBandwidth(selectedBandwidth);
  }, []);

  const onIntervalsChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedIntervals: AttSelectOption[] = options as AttSelectOption[];
    setIntervalsMenuIsOpen(true);
    setIntervals(selectedIntervals);
  }, []);

  const onIterationsNumChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedIterationNum: AttSelectOption[] = options as AttSelectOption[];
    setIterationsMenuIsOpen(true);
    setIterationsCount(selectedIterationNum);
  }, []);

  const onMessageSizeChanged: OnSelectChanged = useCallback((options: SelectOptionType): void => {
    const selectedMessageSize: AttSelectOption[] = options as AttSelectOption[];
    setMessageSizeMenuIsOpen(true);
    setMessageSize(selectedMessageSize);
  }, []);

  const onDescriptionChanged: onTextAreaChangedEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const onDescriptionIperfChanged: onTextAreaChangedEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionIperf(event.target.value);
  };
  
  return (
    <div className={styles.protocol_query_wrapper}>
      <div>
        <h2 className={styles.experiment_title}>{PROTOCOL_QUERY_EN.TITLE}</h2>
        <div className={styles.note}>
          <span className={styles.note_title}>{PROTOCOL_QUERY_EN.NOTE.TITLE}</span>
          <p>{PROTOCOL_QUERY_EN.NOTE.TEXT}</p>
        </div>
      </div>
      <form className={styles.wrapper} data-testid='protocol-query-form' onSubmit={onSubmitTLSHandler}>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.EXPERIMENT_NAME} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <input
                className={styles.input_form_item}
                value={experimentName}
                onChange={onExperimentNameChanged}
                placeholder=''
                required
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.ALGORITHM} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={algorithmOptions}
                placeholder=''
                value={algorithms as AttSelectOption[]}
                onChange={onAlgorithmsChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                required
                customComponent={{ Option: AlgorithmsSelectorCustomOption as React.FC }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.ITERATIONS_NUMBER} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={iterationsOptions}
                placeholder=''
                value={iterationsCount as AttSelectOption[]}
                onChange={onIterationsNumChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                menuIsOpen={iterationsMenuIsOpen}
                setMenuIsOpen={setIterationsMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showIterationsInputOption}
                      setShowInputOption={setShowIterationsInputOption}
                      inputValue={iterationsInputValue}
                      setInputValue={setIterationsInputValue}
                      setMenuIsOpen={setIterationsMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.MESSAGE_SIZE} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={messageSizeOptions}
                placeholder=''
                value={messageSize as AttSelectOption[]}
                onChange={onMessageSizeChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                menuIsOpen={messageSizeMenuIsOpen}
                setMenuIsOpen={setMessageSizeMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showMessageSizeInputOption}
                      setShowInputOption={setShowMessageSizeInputOption}
                      inputValue={messageSizeInputValue}
                      setInputValue={setMessageSizeInputValue}
                      setMenuIsOpen={setMessageSizeMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.DESCRIPTION}
              </label>
              <textarea
                className={styles.form_item_text_area}
                onChange={onDescriptionChanged}
                placeholder=''
              />
          </div>
          <div className={styles.submitButtonWrapper}>
              <Button
                disabled={isFetching}
                actionType={ButtonActionType.SUBMIT}
                size={ButtonSize.LARGE}
                styleType={ButtonStyleType.PRIMARY}
                onButtonClick={noop}
                className={styles.run_button}
              >
                {PROTOCOL_QUERY_EN.ACTION_BUTTONS.RUN}
              </Button>
              {isFetching && 
              <div role='status' className={styles.spinnerWrapper}>
                    <Spinner size={SpinnerSize.EXTRA_SMALL} />
                    <span className={styles.text}>{PROTOCOL_QUERY_EN.FETCH_DATA}</span>
              </div>}
          </div>
      </form>
      <div>
        <h2 className={styles.experiment_title}>{PROTOCOL_QUERY_EN.IPSEC_TITLE}</h2>
        <div className={styles.note}>
          <span className={styles.note_title}>{PROTOCOL_QUERY_EN.IPSEC_NOTE.TITLE}</span>
          <p>{PROTOCOL_QUERY_EN.IPSEC_NOTE.TEXT}</p>
        </div>
      </div>
      <form className={styles.wrapper} data-testid='protocol-query-form' onSubmit={onSubmitIpsecHandler}>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.EXPERIMENT_NAME} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <input
                className={styles.input_form_item}
                value={experimentNameIperf}
                onChange={onExperimentNameIperfChanged}
                placeholder=''
                required
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.IPSEC_ALGORITHM} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={ipsecOptions}
                placeholder=''
                value={ipsecAlgorithms as AttSelectOption[]}
                onChange={onIpsecChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
		menuIsOpen={ipsecMenuIsOpen}
                setMenuIsOpen={setIpsecMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showIpsecInputOption}
                      setShowInputOption={setShowIpsecInputOption}
                      inputValue={ipsecInputValue}
                      setInputValue={setIpsecInputValue}
                      setMenuIsOpen={setIpsecMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.TIME} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={timeOptions}
                placeholder=''
                value={time as AttSelectOption[]}
                onChange={onTimeChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                menuIsOpen={timeMenuIsOpen}
                setMenuIsOpen={setTimeMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showTimeInputOption}
                      setShowInputOption={setShowTimeInputOption}
                      inputValue={timeInputValue}
                      setInputValue={setTimeInputValue}
                      setMenuIsOpen={setTimeMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
               {PROTOCOL_QUERY_EN.FIELDS_LABEL.CONNECTIONS} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={connectionsOptions}
                placeholder=''
                value={connections as AttSelectOption[]}
                onChange={onConnectionsChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                menuIsOpen={connectionsMenuIsOpen}
                setMenuIsOpen={setConnectionsMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showConnectionsInputOption}
                      setShowInputOption={setShowConnectionsInputOption}
                      inputValue={connectionsInputValue}
                      setInputValue={setConnectionsInputValue}
                      setMenuIsOpen={setConnectionsMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.LENGTH} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={messageSizeIperfOptions}
                placeholder=''
                value={messageSizeIperf as AttSelectOption[]}
                onChange={onMessageSizeIperfChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                menuIsOpen={messageSizeIperfMenuIsOpen}
                setMenuIsOpen={setMessageSizeIperfMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showMessageSizeIperfInputOption}
                      setShowInputOption={setShowMessageSizeIperfInputOption}
                      inputValue={messageSizeIperfInputValue}
                      setInputValue={setMessageSizeIperfInputValue}
                      setMenuIsOpen={setMessageSizeIperfMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.BANDWIDTH} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={bandwidthOptions}
                placeholder=''
                value={bandwidth as AttSelectOption[]}
                onChange={onBandwidthChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                menuIsOpen={bandwidthMenuIsOpen}
                setMenuIsOpen={setBandwidthMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showBandwidthInputOption}
                      setShowInputOption={setShowBandwidthInputOption}
                      inputValue={bandwidthInputValue}
                      setInputValue={setBandwidthInputValue}
                      setMenuIsOpen={setBandwidthMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.INTERVALS} <span className={styles.required}>{PROTOCOL_QUERY_EN.FIELDS_LABEL.REQUIRED}</span>
              </label>
              <AttSelect
                className={styles.select_form_item}
                options={intervalsOptions}
                placeholder=''
                value={intervals as AttSelectOption[]}
                onChange={onIntervalsChanged}
                isMulti
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                menuIsOpen={intervalsMenuIsOpen}
                setMenuIsOpen={setIntervalsMenuIsOpen}
                required
                customComponent={{
                  Option: (props: any) =>
                    <SelectorCustomOption
                      {...props}
                      showInputOption={showIntervalsInputOption}
                      setShowInputOption={setShowIntervalsInputOption}
                      inputValue={intervalsInputValue}
                      setInputValue={setIntervalsInputValue}
                      setMenuIsOpen={setIntervalsMenuIsOpen}
                    />
                }}
              />
          </div>
          <div className={styles.form_item}>
              <label className={styles.form_item_label}>
                {PROTOCOL_QUERY_EN.FIELDS_LABEL.DESCRIPTION}
              </label>
              <textarea
                className={styles.form_item_text_area}
                onChange={onDescriptionIperfChanged}
                placeholder=''
              />
          </div>
          <div className={styles.submitButtonWrapper}>
              <Button
                disabled={isFetching}
                actionType={ButtonActionType.SUBMIT}
                size={ButtonSize.LARGE}
                styleType={ButtonStyleType.PRIMARY}
                onButtonClick={noop}
                className={styles.run_button}
              >
                {PROTOCOL_QUERY_EN.ACTION_BUTTONS.RUN}
              </Button>
              {isFetching &&
              <div role='status' className={styles.spinnerWrapper}>
                    <Spinner size={SpinnerSize.EXTRA_SMALL} />
                    <span className={styles.text}>{PROTOCOL_QUERY_EN.FETCH_DATA}</span>
              </div>}
          </div>
      </form>
    </div>
  );
};
