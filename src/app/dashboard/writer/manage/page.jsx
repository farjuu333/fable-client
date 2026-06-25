

import { getManageEbooks } from '@/lib/api/manage'; // আপনার API ফাংশন
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Edit2, Trash2 } from "lucide-react"; 
import { auth } from '@/lib/auth';

const ManageEbookPage = async () => {
   
    const userSession= await auth.api.getSession({
            headers:await headers()
        })
    
        const user = userSession?.user
        const userId=user.id
     
    const books = await getManageEbooks(userId) || []; 
   

    
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'success';
            case 'unpublished':
                return 'danger';
            default:
                return 'warning';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-tight">Manage Ebooks</h2>
                <p className="text-sm text-default-500">Manage all your published and unpublished ebooks.</p>
            </div>

            <Table aria-label="Ebooks management table">
                <Table.ResizableContainer>
                    <Table.Content className="min-w-[800px]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={200}>
                                Book Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="genre" minWidth={150}>
                                Genre
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="price" minWidth={120}>
                                Price
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="actions" minWidth={150}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No ebooks found."}>
                            {books.map((book) => (
                                <Table.Row key={book._id}>
                                    <Table.Cell>
                                        <div className="font-medium text-default-800">
                                            {book.title}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm capitalize">{book.genre}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-sm text-default-600">${book.price}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip 
                                            color={getStatusColor(book.status)} 
                                            size="sm" 
                                            variant="soft"
                                            className="capitalize"
                                        >
                                            {book.status || "Unpublished"}
                                        </Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="relative flex items-center gap-2">
                                            <Tooltip content="View Book">
                                                <Button isIconOnly size="sm" variant="light">
                                                    <Eye className="text-default-400 w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Edit Book">
                                                <Button isIconOnly size="sm" variant="light">
                                                    <Edit2 className="text-default-400 w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Delete Book">
                                                <Button isIconOnly size="sm" variant="light" color="danger">
                                                    <Trash2 className="text-danger w-4 h-4" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default ManageEbookPage;