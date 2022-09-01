<?php

namespace Cooper\BladeBlueprintIcons;

use BladeUI\Icons\Factory;
use Illuminate\Support\ServiceProvider;

class BladeBlueprintIconsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->callAfterResolving(Factory::class, function (Factory $factory) {
            $factory->add('blueprint-icons', [
                'path' => __DIR__ . '/../resources/svg',
                'prefix' => 'blueprint',
            ]);
        });
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../resources/svg' => public_path('vendor/blade-blueprint-icons'),
            ], 'blade-blueprint-icons');
        }
    }
}
