import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
    BookOpen,
    Users,
    BarChart3,
    Zap,
    Star,
    ArrowRight,
    CheckCircle2,
    Play,
    TrendingUp,
    Award,
    Clock,
    Globe,
    Lightbulb,
    Code,
    Smartphone,
    Database,
} from 'lucide-react';

export function LandingPage() {
    const [activeTab, setActiveTab] = useState(0);

    const features = [
        {
            icon: BookOpen,
            title: 'Expert-Curated Courses',
            description: 'Learn from industry professionals with real-world experience',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            icon: TrendingUp,
            title: 'Track Your Progress',
            description: 'Monitor your learning journey with detailed analytics',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            icon: Users,
            title: 'Community Learning',
            description: 'Interact with instructors and fellow learners',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            icon: Award,
            title: 'Earn Certificates',
            description: 'Get recognized for your achievements',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            icon: Clock,
            title: 'Learn at Your Pace',
            description: 'Study whenever and wherever you want',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            icon: Zap,
            title: 'AI-Powered Learning',
            description: 'Personalized quizzes and smart recommendations',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
    ];

    const courses = [
        {
            title: 'Full Stack MERN Development',
            description: 'Master modern web development with MongoDB, Express, React, and Node.js',
            icon: Code,
            level: 'Intermediate',
            duration: '12 weeks',
            price: '$499',
        },
        {
            title: 'Mobile App Development',
            description: 'Build stunning mobile applications for iOS and Android',
            icon: Smartphone,
            level: 'Intermediate',
            duration: '10 weeks',
            price: '$399',
        },
        {
            title: 'Database Design',
            description: 'Learn to design and optimize databases for scalability',
            icon: Database,
            level: 'Advanced',
            duration: '8 weeks',
            price: '$349',
        },
    ];

    const stats = [
        { number: '10K+', label: 'Active Students' },
        { number: '50+', label: 'Expert Instructors' },
        { number: '100+', label: 'Courses Available' },
        { number: '95%', label: 'Satisfaction Rate' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">LearnHub</span>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/login">
                            <Button variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-blue-950/20 dark:to-slate-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                Learn Skills That Matter
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                Join thousands of students learning from industry experts. Master in-demand skills and accelerate your career.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="flex-1 sm:flex-none">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-semibold flex items-center justify-center gap-2">
                                    Start Learning Now
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <button className="h-12 px-8 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/30 flex items-center justify-center gap-2 transition-colors">
                                <Play className="h-5 w-5" />
                                Watch Demo
                            </button>
                        </div>

                        <div className="flex gap-8 pt-8">
                            {stats.map((stat, idx) => (
                                <div key={idx}>
                                    <p className="text-3xl font-bold text-blue-600">{stat.number}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur-2xl opacity-30" />
                        <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
                            <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                <Play className="h-16 w-16 text-white opacity-80" />
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Learn from industry experts</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Lifetime access to course materials</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Complete projects and earn certificates</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Why Choose LearnHub?</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Everything you need to succeed in your learning journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group rounded-2xl border border-slate-200 dark:border-slate-800 p-8 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 bg-white dark:bg-slate-900"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`h-6 w-6 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Popular Courses</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">Start your learning journey with our most popular courses</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, idx) => {
                            const Icon = course.icon;
                            return (
                                <div key={idx} className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col">
                                    <div className="h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                        <Icon className="h-16 w-16 text-white opacity-80" />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">{course.description}</p>
                                        <div className="flex items-center justify-between mb-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">{course.level}</span>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {course.duration}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                                            <Link to="/register">
                                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Enroll</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">Join thousands of happy learners</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "This course transformed my career. The instructors are amazing and the content is top-notch!",
                                author: "Sarah Chen",
                                role: "Full Stack Developer",
                                rating: 5,
                            },
                            {
                                quote: "Best learning platform I've used. The progression is logical and the projects are practical.",
                                author: "Rajesh Kumar",
                                role: "Mobile Developer",
                                rating: 5,
                            },
                            {
                                quote: "The community here is supportive and the support team is incredibly helpful. Highly recommended!",
                                author: "Emma Wilson",
                                role: "UI/UX Designer",
                                rating: 5,
                            },
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 hover:shadow-lg transition-shadow">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-blue-400 text-blue-400" />
                                    ))}
                                </div>
                                <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
                    <p className="text-xl text-blue-100 mb-8">Join thousands of students and advance your career today</p>
                    <Link to="/register">
                        <Button className="bg-white text-blue-600 hover:bg-slate-100 h-12 px-8 text-lg font-semibold">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="h-6 w-6 text-blue-400" />
                                <span className="text-white font-bold">LearnHub</span>
                            </div>
                            <p className="text-sm">Empowering learners worldwide with quality education.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Platform</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Instructors</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Learn</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8 text-center text-sm">
                        <p>&copy; 2026 LearnHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
