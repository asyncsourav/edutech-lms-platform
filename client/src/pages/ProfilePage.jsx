

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../lib/auth';
import api from '../lib/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  User,
  Upload,
  CheckCircle2,
  Mail,
  UserCircle,
} from 'lucide-react';



export function ProfilePage() {

  const { user, updateUser, loading: authLoading } = useAuth();

  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPreview(user.profilePhoto || '');
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePhoto(file);

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();
      formData.append('fullName', fullName);

      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      const response = await api.post('/updateProfile', formData);

      if (response.data.success) {
        updateUser(response.data.user);
        setProfilePhoto(null);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Please login to view your profile</p>
      </div>
    );
  }




  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center border-4 border-blue-300 dark:border-blue-700/30 shadow-lg">
                    <User className="h-20 w-20 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* REAL working button */}
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => fileInputRef.current.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {profilePhoto ? 'Change Photo' : 'Upload Photo'}
              </Button>

              {profilePhoto && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Photo selected
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                type="email"
                value={user.email}
                disabled
                className="bg-muted h-11"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Full Name
              </label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-11"
                placeholder="Enter your full name"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11"
              size="lg"
              disabled={updating}
            >
              {updating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Update Profile
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


