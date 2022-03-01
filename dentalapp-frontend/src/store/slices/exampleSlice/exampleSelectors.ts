import { RootState } from 'store/store';
import { ExampleState, EXAMPLE_KEY } from './example';

export const selectExampleProp = (state: any) => state.exampleProp;

const backgroundSelectors = {
  getBackgroundState: (rootState: RootState): ExampleState => rootState[EXAMPLE_KEY],
};

export default backgroundSelectors;
