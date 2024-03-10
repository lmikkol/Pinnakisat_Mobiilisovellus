/* eslint-disable no-unused-vars */
import Select from 'react-select';

import {
	groupedOptions, sorsalinnut, kanalinnut, kuikkalinnut, uikkulinnut, ulappalinnut, pelikaanilinnut, haikaralinnut,
	päiväpetolinnut, jalohaukkalinnut, kurkilinnut, rantalinnut, hietakanalinnut, kyyhkylinnut,
	käkilinnut, pöllölinnut, kehrääjälinnut, kirskulinnut, säihkylinnut, tikkalinnut, varpuslinnut
} from '../data/birds'



const SightingsForm = ({ selectedOption, setSelectedOption }) => {

	return (
		<div>
			<h2>Havainnot</h2>
			<Select
				value={selectedOption}
				isMulti
				onChange={setSelectedOption}
				options={groupedOptions}
				getOptionLabel={(option) => option.fi}
				getOptionValue={(option) => option.fi}
				closeMenuOnSelect={false}
			/>
		</div>
	)
}



export default SightingsForm