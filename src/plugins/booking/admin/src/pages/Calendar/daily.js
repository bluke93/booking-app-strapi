import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import { Box, BaseHeaderLayout, TabGroup, Tabs, Tab, TabPanels, TabPanel, Badge, Switch } from "@strapi/design-system"
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections,
  SubNavLink,
  SubNavLinkSection,
} from '@strapi/design-system/v2';
import { Table, Thead, Tbody, Tr, Td, Th, BaseCheckbox, Typography, VisuallyHidden, Avatar, Flex, IconButton} from '@strapi/design-system';
import { Pencil, Trash, Apps, ExclamationMarkCircle } from '@strapi/icons'

import { format, parseISO, add } from 'date-fns'
import DailyRowView from '../../components/Calendar/DailyRowView';


function buildSlots(open = '09:00', close = '18:00', duration = 30, quantity = 1, delay = 10){
  if(open >= close){
    return [];
  }
  const openHour = parseISO(`2019-02-11T${open}:00`);
  const closeHour = parseISO(`2019-02-11T${close}:00`);

  const slots = [];

  var currentHour = openHour;

  while(currentHour < closeHour){
    const startSlot = currentHour;
    currentHour = add(currentHour, {minutes: duration})

    if(currentHour > closeHour){
      return slots;
    }

    const slot = {
      start: format(startSlot, 'HH:mm'),
      end: format(currentHour, 'HH:mm'),
      reservations: [],
      maxReservations: quantity,
      enabled: true,
    }

    slots.push(slot);

    currentHour = add(currentHour, {minutes: delay})
  }

  return slots;
}

function showSlots(){

  const slots = buildSlots('09:00','18:00', 60, 5, 0);


  const ROW_COUNT = slots.length + 1;
  const COL_COUNT = 10;
  const entry = {
    cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
    name: 'Ciccio pasticcio',
    contact: 'email@email.com'
  };
  const entries = [];
  slots.forEach((slot, index) =>{
     entries.push({
      ...entry,
      startHour: slot.start,
      endHour: slot.end,
      enabled: slot.enabled,
      id: index
    });
  })
  const [state, setState] = useState({
    slots: entries
  });
  const setActivated = (row) => {
    setState(state => {
      const newRow = {...row, enabled: !row.enabled};
      const newState = state;
      newState.slots[row.id] = newRow;
      return {...newState};
    });
    console.log(state);
  }
  return <Table colCount={COL_COUNT} rowCount={ROW_COUNT} >
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">Start hour</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">End hour</Typography>
              </Th>
              <Th>
                <Typography>Name</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Email</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.slots.map(entry => <Tr key={entry.id}>
                <Td>
                  <Typography textColor="neutral800">{entry.startHour}</Typography>
                </Td>
                  <Td>
                  <Typography textColor="neutral800">{entry.endHour}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.name}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{entry.contact}</Typography>
                </Td>
                <Td>
                  <Flex>
                    <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                    <Box paddingLeft={1}>
                      <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                    </Box>
                    <Switch selected={entry.enabled} onChange={() => setActivated(entry)} label="Active slot" />
                   </Flex>
                </Td>
              </Tr>)}
          </Tbody>
        </Table>
}


// const Daily = () => {
//   return (
//     <>
//       <Box background="neutral100">
//         <BaseHeaderLayout title="Appointments" subtitle="36 pending appointments found" as="h2" />
//       </Box>
//       <Box padding={8}>
//         <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
//           <TabGroup label="Some stuff for the label" id="tabs" onTabChange={selected => console.log(selected)}>
//             <Tabs>
//               <Tab>Pending <Badge size="S" active>18</Badge></Tab>
//               <Tab>Upcoming</Tab>
//               <Tab>Past</Tab>
//               <Tab>Canceled</Tab>
//             </Tabs>
//             <TabPanels>
//               <TabPanel>
//                 <Box color="neutral800" padding={4} background="neutral0">
//                   Pending
//                 </Box>
//               </TabPanel>
//               <TabPanel>
//                 <Box color="neutral800" padding={4} background="neutral0">
//                   {showSlots()}
//                 </Box>
//               </TabPanel>
//               <TabPanel>
//                 <Box color="neutral800" padding={4} background="neutral0">
//                   Past
//                 </Box>
//               </TabPanel>
//               <TabPanel>
//                 <Box color="neutral800" padding={4} background="neutral0">
//                   Canceled
//                 </Box>
//               </TabPanel>
//             </TabPanels>
//           </TabGroup>
//         </Box>
//       </Box>
//     </>
//   );
// };

const Daily = () => {
  return (
    <>
      <Box padding={8}>
        {showSlots()}
      </Box>
    </>
  );
};

export default Daily;
