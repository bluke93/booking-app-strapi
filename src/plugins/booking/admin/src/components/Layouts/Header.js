
import React from 'react';
import { Box, BaseHeaderLayout, Button } from "@strapi/design-system"

const Header = () => {
  return <>
    <Box background="neutral100">
      <BaseHeaderLayout title="Appointments" subtitle="36 pending appointments found" as="h2" />
    </Box>
  </>
}

export default Header;
