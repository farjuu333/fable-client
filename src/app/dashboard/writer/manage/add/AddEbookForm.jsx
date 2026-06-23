"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, TextArea, FieldError, Button, Select, ListBox, toast } from "@heroui/react";
import { createManage } from "@/lib/actions/manage";
import { redirect } from "next/navigation";
import { ArrowUpToLine } from "lucide-react"; // আইকন ইমপোর্ট


export default function AddEbookForm() {
    const [isPublished, setIsPublished] = useState(false);
    const [logoUrl, setLogoUrl] = useState(''); // ইমেজ ইউআরএল স্টোর করার জন্য
    const [errors, setErrors] = useState({});
const [isUploading, setIsUploading] = useState(false);

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error" }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Simple Validation
        const newErrors = {};
        // if (!data.title) newErrors.title = "Book title is required";
        // if (!data.price) newErrors.price = "Price is required";
        // if (!data.genre) newErrors.genre = "Genre is required";
        // if (!data.description) newErrors.description = "Short description is required";
        // if (!data.content) newErrors.content = "Ebook content is required";
        // if (!data.status) newErrors.status = "Status is required";
        if (!data.title?.trim()) newErrors.title = "Book title is required";
        if (!data.writerName?.trim()) newErrors.writerName = "Writer name is required";
    if (!data.price?.trim()) newErrors.price = "Price is required";
    if (!data.genre?.trim()) newErrors.genre = "Genre is required";
    if (!data.description?.trim()) newErrors.description = "Short description is required";
    
    // কনটেন্ট এবং স্ট্যাটাস চেক
    if (!data.content?.trim()) newErrors.content = "Ebook content is required";
    if (!data.status) newErrors.status = "Status is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const currentBook = typeof book !== 'undefined' ? book : { _id: "book_123", title: data.title };

        const payload = {
            ...data,
            isPublished,
           bookId: currentBook._id, 
        bookTitle: currentBook.title,
            coverImage: logoUrl, // আপলোড করা লিঙ্কটি এখানে যোগ হলো
            status:"Published",
            isPubliclyVisible: true,
        };
        const res = await createManage(payload);

        if (res.insertedId) {
            toast.success("Added Book successfully!");
            e.target.reset();
            setIsPublished(false);
            redirect("/dashboard/writer/manage");
        }


        console.log("Form Data:", data);
        toast.success("Ebook added successfully!");
    };

    const inputClass = "w-full text-black bg-[#1c1c1e] border border-zinc-800 rounded-lg h-12 px-3 text-sm outline-none transition-all focus:border-zinc-600";
    const triggerClasses = "w-full flex items-center justify-between bg-[#1c1c1e] border border-zinc-800 h-12 rounded-lg px-3 text-black text-sm outline-none";
    const popoverClasses = "bg-white border border-zinc-800  rounded-lg shadow-xl p-1";
    const listItemClasses = "p-2 rounded-md hover:bg-zinc-800 cursor-pointer text-sm text-black";

    return (
        <div className="min-h-screen bg-[#0d0d0e] py-12 px-4">
            <div className="max-w-2xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
                <div className="border-b border-zinc-800 pb-6 mb-8">
                    <h1 className="text-2xl font-semibold">Publish a New Ebook</h1>
                    <p className="text-zinc-400 text-sm mt-1">Share your stories with readers around the world.</p>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-6">
                    <TextField name="title" isInvalid={!!errors.title} className="flex flex-col gap-1">
                        <Label className="text-zinc-400 text-sm font-medium">Book Title</Label>
                        <Input placeholder="Enter book title" className={inputClass} />
                    </TextField>

                    <TextField name="writerName" className="flex flex-col gap-1">
    <Label className="text-zinc-400 text-sm font-medium">Writer Name</Label>
    <Input placeholder="Enter your name" className={inputClass} />
</TextField>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField name="genre" isInvalid={!!errors.genre} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm font-medium">Genre</Label>
                            <Input placeholder="e.g. Fiction" className={inputClass} />
                        </TextField>
                        <TextField name="price" isInvalid={!!errors.price} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm font-medium">Price ($)</Label>
                            <Input type="number" placeholder="9.99" className={inputClass} />
                        </TextField>
                    </div>

                    {/* <TextField name="coverImage" className="flex flex-col gap-1">
                        <Label className="text-zinc-400 text-sm font-medium">Cover Image URL (ImgBB)</Label>
                        <div className="relative flex items-center">
                            
                            <Input placeholder="Paste image link here" className={`${inputClass} pl-10`} />
                        </div>
                    </TextField> */}

                    {/* ইমেজ আপলোড সেকশন */}
                    <div className="flex flex-col gap-1 w-full">
                        <span className="text-zinc-400 font-medium text-sm">Cover Image</span>
                        <div className="flex items-center gap-4 mt-1">
                            <label className="w-14 h-14 border border-dashed border-zinc-700 bg-zinc-900/40 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden">
                                <input type="file" accept="image/png, image/jpeg" onChange={handleLogoUpload} className="hidden" />
                                {logoUrl ? (
                                    <img src={logoUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <ArrowUpToLine size={18} className="text-zinc-400" />
                                )}
                            </label>
                            <div className="flex flex-col">
                                <span className="text-sm text-zinc-300">{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                                {errors.logo && <span className="text-xs text-danger">{errors.logo}</span>}
                            </div>
                        </div>
                    </div>

                    <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1">
                        <Label className="text-zinc-400 text-sm font-medium">Short Description</Label>
                        <TextArea placeholder="Brief summary of your book..." rows={3} className={`${inputClass} h-auto p-3`} />
                    </TextField>

                    {/* নতুন যোগ করা: Ebook Content */}
                    <TextField name="content" isInvalid={!!errors.content} className="flex flex-col gap-1">
                        <Label className="text-zinc-400 text-sm font-medium">Ebook Content</Label>
                        <TextArea placeholder="Full content of your ebook..." rows={6} className={`${inputClass} h-auto p-3`} />
                    </TextField>

                    {/* নতুন যোগ করা: Publishing Status */}
                    <Select name="status" className="w-full" isInvalid={!!errors.status}>
                        <Label className="text-zinc-400 text-sm font-medium mb-1 block">Publishing Status</Label>
                        <Select.Trigger className={triggerClasses}>
                            <Select.Value placeholder="Select status" />
                        </Select.Trigger>
                        <Select.Popover className={popoverClasses}>
                            <ListBox>
                                {/* <ListBox.Item id="published" className={listItemClasses}>Published</ListBox.Item>
                                <ListBox.Item id="unpublished" className={listItemClasses}>Unpublished</ListBox.Item> */}
                                <ListBox.Item id="published" textValue="Published" className={listItemClasses}>Published</ListBox.Item>
<ListBox.Item id="unpublished" textValue="Unpublished" className={listItemClasses}>Unpublished</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    <div className="flex justify-end pt-4 border-t border-zinc-800">
                        <Button type="submit" className="bg-white text-black font-semibold rounded-lg px-8 h-11 hover:bg-zinc-200">
                            Publish Ebook
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}