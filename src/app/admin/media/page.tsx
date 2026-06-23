"use client";

import { useState } from "react";
import { Trash2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useMedia } from "@/hooks/useMedia";

export default function MediaPage() {
  const { media, uploadFiles, uploadFromUrl, deleteMedia, getStorageUsage } =
    useMedia();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: FileList) => {
    setIsUploading(true);
    await uploadFiles(files);
    setIsUploading(false);
  };

  const handleUrlAdd = (url: string) => {
    uploadFromUrl(url);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const storage = getStorageUsage();
  const storagePercent = Math.min((parseFloat(storage.mb) / 5) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Storage Info */}
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>
            LocalStorage is optimized for small images. For large media,
            consider cloud storage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {storage.mb} MB used of ~5 MB recommended
            </span>
            <span className="font-medium">{media.length} files</span>
          </div>
          <Progress value={storagePercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Uploader */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Media</CardTitle>
          <CardDescription>
            Drag and drop images or paste a URL. Files are stored in browser
            localStorage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MediaUploader
            onFileUpload={handleUpload}
            onUrlAdd={handleUrlAdd}
            isUploading={isUploading}
          />
        </CardContent>
      </Card>

      {/* Library */}
      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <CardDescription>
            {media.length} items in your library
          </CardDescription>
        </CardHeader>
        <CardContent>
          {media.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p>No media uploaded yet. Upload your first image above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {media.map((m) => (
                <div
                  key={m.id}
                  className="group relative rounded-lg overflow-hidden border bg-muted aspect-square">
                  <img
                    src={m.url}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <p className="text-xs text-white truncate mb-2">{m.name}</p>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white"
                        onClick={() => copyUrl(m.url)}
                        title="Copy URL">
                        <Copy className="h-3 w-3" />
                      </Button>
                      {m.url.startsWith("http") && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 bg-white/20 hover:bg-white/30 text-white"
                          asChild>
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 bg-destructive/80 hover:bg-destructive text-white ml-auto"
                        onClick={() => setDeleteId(m.id)}
                        title="Delete">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Delete Media"
        description="Are you sure you want to delete this image? It will be removed from all properties using it."
        confirmText="Delete"
        onConfirm={() => {
          if (deleteId) deleteMedia(deleteId);
          setDeleteId(null);
        }}
      />
    </div>
  );
}
