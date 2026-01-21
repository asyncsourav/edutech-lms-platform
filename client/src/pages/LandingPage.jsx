import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
    BookOpen,
    Users,
    Award,
    ArrowRight,
    CheckCircle2,
    Star,
    Clock,
    Code,
    Smartphone,
    Database,
    TrendingUp,
    Zap,
    Lightbulb,
    MessageCircle,
    Video,
    Sparkles,
} from 'lucide-react';

export function LandingPage() {
    const stats = [
        { number: '10K+', label: 'Students', icon: Users },
        { number: '50+', label: 'Instructors', icon: BookOpen },
        { number: '100+', label: 'Courses', icon: Video },
        { number: '95%', label: 'Satisfaction', icon: Star },
    ];

    const features = [
        {
            icon: Sparkles,
            title: 'Expert-Led Courses',
            description: 'Learn from industry professionals with years of experience',
        },
        {
            icon: TrendingUp,
            title: 'Track Progress',
            description: 'Monitor your learning with detailed progress analytics',
        },
        {
            icon: Award,
            title: 'Earn Certificates',
            description: 'Get recognized credentials upon course completion',
        },
        {
            icon: Clock,
            title: 'Learn at Your Pace',
            description: 'Study whenever and wherever you want with lifetime access',
        },
        {
            icon: Users,
            title: 'Community Support',
            description: 'Connect with instructors and fellow learners',
        },
        {
            icon: Zap,
            title: 'AI-Powered Quizzes',
            description: 'Smart assessments tailored to your learning style',
        },
    ];

    const courses = [
        {
            title: 'Full Stack MERN Development',
            description: 'Master MongoDB, Express, React, and Node.js',
            icon: Code,
            badge: 'Intermediate',
            students: '2.5K+',
        },
        {
            title: 'Mobile App Development',
            description: 'Build iOS and Android applications from scratch',
            icon: Smartphone,
            badge: 'Intermediate',
            students: '1.8K+',
        },
        {
            title: 'Advanced Database Design',
            description: 'Design scalable and optimized databases',
            icon: Database,
            badge: 'Advanced',
            students: '1.2K+',
        },
    ];

    const testimonials = [
        {
            quote: 'This platform completely transformed my career. The content is practical and the instructors are genuinely invested in your success.',
            author: 'Sarah Chen',
            role: 'Full Stack Developer at Google',
            avatar: 'SC',
        },
        {
            quote: 'The best online learning experience I\'ve had. Clear explanations, great projects, and amazing community support.',
            author: 'Rajesh Kumar',
            role: 'Mobile Developer at Microsoft',
            avatar: 'RK',
        },
        {
            quote: 'Affordable, comprehensive, and beautifully designed. Highly recommend LearnHub to anyone serious about learning.',
            author: 'Emma Wilson',
            role: 'UI/UX Designer at Adobe',
            avatar: 'EW',
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">

            {/* Hero Section */}
            <section className="pt-32 pb-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
                <div className="absolute inset-0 -bottom-40 -left-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 dark:text-white">
                                    Learn Skills That <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Matter</span>
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                                    Master in-demand skills with expert-led courses. Join thousands of successful learners advancing their careers.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register" className="flex-1 sm:flex-none">
                                    <Button className="w-full sm:w-auto h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg gap-2 rounded-lg shadow-lg hover:shadow-xl transition-all">
                                        Start Learning Now
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <button className="h-12 px-6 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                                    Learn More
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6 pt-8">
                                {stats.map((stat, idx) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.number}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right - Hero Image/Card */}
                        <div className="relative lg:h-96 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-950/30 rounded-3xl blur-2xl opacity-50" />
                            <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                {/* Video Placeholder */}
                                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </div>
                                    <button className="relative p-4 bg-white/20 rounded-full hover:bg-white/30 transition-all backdrop-blur-sm">
                                        <svg className="h-12 w-12 text-white fill-current" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Why Choose LearnHub?</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">Expert instructors</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">Lifetime access</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">Certificates</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">Platform Features</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Everything You Need to Succeed</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Comprehensive tools and features designed for effective learning</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-3 w-fit bg-blue-50 dark:bg-blue-900/30 rounded-xl mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">Popular Courses</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Start Your Learning Journey</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Choose from our most in-demand courses</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, idx) => {
                            const Icon = course.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 flex flex-col"
                                >
                                    {/* Course Header */}
                                    <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                        <div className="absolute inset-0 opacity-10 bg-gradient-to-t from-black/50 to-transparent" />
                                        <Icon className="h-16 w-16 text-white opacity-80 relative" />
                                    </div>

                                    {/* Course Info */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">{course.description}</p>

                                        {/* Course Meta */}
                                        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                            <div className="flex items-center justify-between">
                                                <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg">
                                                    {course.badge}
                                                </span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    {course.students} learning
                                                </span>
                                            </div>

                                            <Link to="/register" className="block">
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                                                    Explore Course
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View All Link */}
                    <div className="text-center mt-12">
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
                            View All Courses
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <span className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Trusted by Thousands</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">See what our successful students have to say</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300"
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto relative z-10 text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Transform Your Career?</h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Join over 10,000 students who have already started their learning journey with LearnHub
                        </p>
                    </div>
                        <br/>
                    <Link to="/register">
                        <Button className="h-12 px-8 bg-white text-blue-600 hover:bg-slate-100 font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all">
                            Get Started Free Today
                        </Button>
                    </Link>
                </div>
            </section>
            
        </div>
    );
}
