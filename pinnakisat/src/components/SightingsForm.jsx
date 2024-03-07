import React from 'react';
import Select from 'react-select';
import {groupedOptions, sorsalinnut, kanalinnut, kuikkalinnut, uikkulinnut, ulappalinnut, pelikaanilinnut, haikaralinnut,
  päiväpetolinnut, jalohaukkalinnut, kurkilinnut, rantalinnut, hietakanalinnut, kyyhkylinnut,
   käkilinnut, pöllölinnut, kehrääjälinnut, kirskulinnut, säihkylinnut, tikkalinnut, varpuslinnut
  } from '../data/birds'


const SightingsForm = ({ handler, selectedOption}) => {
	return (
		<div>
			<h2>Havainnot</h2>
			<form onSubmit={handler}>
				<Select
					value={selectedOption}
					isMulti={true}
					onChange={handler}
					options={groupedOptions}
					getOptionLabel={(option) => option.fi}
				/>
				<button>Tallenna</button>
			</form>
		</div>
	)
}

export default SightingsForm