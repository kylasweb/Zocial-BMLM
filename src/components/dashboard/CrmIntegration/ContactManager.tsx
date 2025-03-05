import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Email, Phone } from '@mui/icons-material';
import { updateContact, deleteContact } from '../../../store/slices/crmSlice';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface ContactManagerProps {
  contacts: Contact[];
}

export default function ContactManager({ contacts }: ContactManagerProps) {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactAction = (action, contact) => {
    switch (action) {
      case 'edit':
        dispatch(updateContact(contact));
        break;
      case 'delete':
        dispatch(deleteContact(contact.id));
        break;
      case 'email':
        window.location.href = `mailto:${contact.email}`;
        break;
      case 'call':
        window.location.href = `tel:${contact.phone}`;
        break;
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs>
          <Typography variant="h6">Contact Management</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleContactAction('edit', contact)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleContactAction('email', contact)}>
                  <Email />
                </IconButton>
                <IconButton onClick={() => handleContactAction('call', contact)}>
                  <Phone />
                </IconButton>
                <IconButton onClick={() => handleContactAction('delete', contact)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
